import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  navigateTo,
  useDirectusAuth,
} from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig().public.directus;
  const { user, fetchUser } = useDirectusAuth();

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
    return navigateTo({
      path: config.auth.redirect.login,
      query: { redirect: to.path },
    });
  }
});
