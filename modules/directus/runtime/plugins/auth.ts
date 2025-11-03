import auth from "../middleware/auth";
import common from "../middleware/common";
import guest from "../middleware/guest";

import {
  addRouteMiddleware,
  defineNuxtPlugin,
  useDirectusAuth,
  useRuntimeConfig,
  useState,
} from "#imports";

export default defineNuxtPlugin(async () => {
  try {
    const config = useRuntimeConfig().public.directus;

    addRouteMiddleware("common", common, { global: true });

    addRouteMiddleware("auth", auth, {
      global: config.auth.enableGlobalAuthMiddleware,
    });

    addRouteMiddleware("guest", guest);

    const initialized = useState("directus-auth-initialized", () => false);

    const { user, fetchUser, _loggedIn } = useDirectusAuth();

    console.log("get [PLUGIN]", _loggedIn.get());
    console.log("initialized [PLUGIN]", initialized.value);
    /* Mark: if logged in */
    if (initialized.value === false && _loggedIn.get()) {
      console.log("fetchUser in plugin  not initialized but logged in");
      await fetchUser({});
    }

    initialized.value = true;

    if (user.value) {
      _loggedIn.set(true);
    } else {
      _loggedIn.set(false);
    }
  } catch (err: any) {
    console.error(err);
  }
});
