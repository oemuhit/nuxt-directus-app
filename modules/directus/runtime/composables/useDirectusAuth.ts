import {
  readMe,
  createDirectus,
  rest,
  passwordRequest,
  passwordReset,
  staticToken,
} from "@directus/sdk";
import { joinURL } from "ufo";

import { withToken } from "@directus/sdk";
import type { RestClient, AuthenticationClient } from "@directus/sdk";

import type { Schema } from "#shared/types/schema";
import type { DirectusUser } from "#shared/types/schema";
import { parseCookies } from "h3";

import {
  useState,
  useRuntimeConfig,
  useRoute,
  navigateTo,
  clearNuxtData,
  useNuxtApp,
  nextTick,
} from "#imports";
import type { User } from "@directus/types";

export default function useDirectusAuth<DirectusSchema extends object>() {
  const nuxtApp = useNuxtApp();

  const $directus = nuxtApp.$directus as RestClient<Schema> &
    AuthenticationClient<Schema>;

  const user: Ref<DirectusUser | null | undefined> = useState(
    "user",
    () => null
  );

  const config = useRuntimeConfig();

  const _loggedIn = {
    get: () => {
      // SSR tarafında güvenli okuma
      if (import.meta.server) {
        const cookie = useCookie("authenticated", {
          path: "/",
          sameSite: "lax",
          secure: true || process.env.NODE_ENV === "production",
          httpOnly: true,
        });
        console.log("get [SSR]", cookie.value);
        return cookie.value?.toString() === "true";
      }

      // CSR tarafında (tarayıcıda) httpOnly cookie okunamaz
      // bu yüzden httpOnly=false ile eriş
      const cookie = useCookie("authenticated", {
        path: "/",
        sameSite: "lax",
        secure: true || process.env.NODE_ENV === "production",
      });
      console.log("get [CSR]", cookie.value);
      return cookie.value?.toString() === "true";
    },

    set: (value: boolean) => {
      // SSR’de cookie set etmek anlamsız (redirect dışında)
      if (import.meta.server) return;

      // Client tarafında cookie yaz
      const cookie = useCookie("authenticated", {
        path: "/",
        sameSite: "lax",
        secure: true || process.env.NODE_ENV === "production",
      });
      console.log("set [CSR]", value);
      cookie.value = value.toString();
    },
  };
  async function login(email: string, password: string, otp?: string) {
    const route = useRoute();

    const response = await $directus.login({ email, password });

    const returnPath = route.query.redirect?.toString();
    const redirect = returnPath ? returnPath : "/dashboard";

    _loggedIn.set(true);

    // Fetch user data first, then navigate
    await fetchUser({ fields: ["*", { contacts: ["*"] }] });

    // Wait a bit more to ensure state is fully updated
    await new Promise((resolve) => setTimeout(resolve, 100));

    await navigateTo(redirect);
  }

  async function logout() {
    const token = await $directus.getToken();

    await $directus.logout();

    user.value = null;
    _loggedIn.set(false);

    await clearNuxtData();
    await navigateTo(
      config.public?.directus?.auth?.redirect?.login || "/auth/login"
    );
  }

  async function fetchUser(params?: object) {
    if (user.value) {
      return;
    }

    const fields = config.public?.directus?.auth?.userFields || ["*"];

    try {
      const response = await $directus.request(
        readMe({
          // @ts-ignore
          fields,
          ...params,
        })
      );

      user.value = response as DirectusUser;

      // Force reactivity update
      nextTick(() => {
        console.log("User state after nextTick:", user.value);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      user.value = null;
    }
  }

  return {
    user,
    login,
    logout,
    fetchUser,
    _loggedIn,
  };
}
