import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  navigateTo,
  useDirectusAuth,
} from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig().public.directus;
  const { user, _loggedIn, fetchUser } = useDirectusAuth();

  console.log("user", user.value);

  if (
    to.path === config.auth.redirect.login ||
    to.path === config.auth.redirect.callback
  ) {
    return;
  }

  if (config.auth.enableGlobalAuthMiddleware === true) {
    if (to.meta.auth === false) {
      return;
    }
  }

  if (!user.value) {
    console.log("fetchUserxss");
    await fetchUser({ fields: ["*", { contacts: ["*"] }] });
    console.log("res");
    console.log("user", user.value);
  }

  if (!user.value) {
    return navigateTo({
      path: config.auth.redirect.login,
      query: { redirect: to.path },
    });
  }
});
