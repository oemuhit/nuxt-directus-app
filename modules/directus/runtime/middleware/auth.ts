import { defineNuxtRouteMiddleware, useRuntimeConfig, navigateTo, useDirectusAuth } from '#imports';

export default defineNuxtRouteMiddleware((to) => {
	const config = useRuntimeConfig().public.directus;
	const { user, _loggedIn } = useDirectusAuth();
	console.log('user', user.value);
	console.log('_loggedIn', _loggedIn.get());
	if (to.path === config.auth.redirect.login || to.path === config.auth.redirect.callback) {
		return;
	}

	if (config.auth.enableGlobalAuthMiddleware === true) {
		if (to.meta.auth === false) {
			return;
		}
	}

	// Check both user state and localStorage to handle race conditions
	if (!user.value && !_loggedIn.get()) {
		return navigateTo({
			path: config.auth.redirect.login,
			query: { redirect: to.path },
		});
	}
});
