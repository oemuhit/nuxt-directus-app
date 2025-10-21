import { readMe, passwordRequest, passwordReset } from "@directus/sdk";
import type { RestClient, AuthenticationClient } from "@directus/sdk";
import type { Schema } from "#shared/types/schema";
import type { DirectusUser } from "#shared/types/schema";

import {
  useState,
  useRuntimeConfig,
  useRoute,
  navigateTo,
  clearNuxtData,
  useNuxtApp,
} from "#imports";

export default function useDirectusAuth<DirectusSchema extends object>() {
  const nuxtApp = useNuxtApp();

  const $directus = nuxtApp.$directus as RestClient<Schema> &
    AuthenticationClient<Schema>;

  const user: Ref<DirectusUser | null | undefined> = useState("user");

  const config = useRuntimeConfig();

  const _loggedIn = {
    //process.client &&
    /* 		get: () => {
			return process.client && localStorage.getItem('authenticated');
		},
		set: (value: boolean) => process.client && localStorage.setItem('authenticated', value.toString()),
	 */

    get: () => {
      const cookie = useCookie("authenticated", { path: "/", sameSite: "lax" });
      console.log("get", cookie.value);
      return cookie.value?.toString() === "true";
    },
    set: (value: boolean) => {
      const cookie = useCookie("authenticated", { path: "/", sameSite: "lax" });
      console.log("set", value);
      cookie.value = value.toString();
    },
  };

  async function login(email: string, password: string, otp?: string) {
    const route = useRoute();

    const response = await $directus.login({ email, password });

    const returnPath = route.query.redirect?.toString();
    const redirect = returnPath ? returnPath : "/dashboard";

    _loggedIn.set(true);

    setTimeout(async () => {
      await fetchUser({ fields: ["*", { contacts: ["*"] }] });
      await navigateTo(redirect);
    }, 100);
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
    const fields = config.public?.directus?.auth?.userFields || ["*"];

    const response = await $directus.request(
      readMe({
        // @ts-ignore
        fields,
        ...params,
      })
    );

    user.value = response as User;
  }

  return {
    user,
    login,
    logout,
    fetchUser,
    _loggedIn,
  };
}
