import type { NavigationGuard } from "vue-router";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser } = useDirectusAuth();

  console.log("Global middleware çalıştı:", to.fullPath, from.fullPath);
  console.log(to);
  if (!user.value) {
    await fetchUser();
  }
});
