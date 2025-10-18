import { authentication, createDirectus, rest } from '@directus/sdk';
import { joinURL } from 'ufo';
import type { Schema } from '~/types/schema';

import { defineNuxtPlugin, useRoute, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
	const route = useRoute();
	const config = useRuntimeConfig();

	const fetchUtils = (url: RequestInfo, options: RequestInit) => {
		// SSR ise headers.cookie ekle
		if (process.server) {
			const event = nuxtApp.ssrContext?.event;

			if (event) {
				options.headers = {
					...(options.headers || {}),
					cookie: event.node.req.headers.cookie || '',
				};
			}
		} else {
			console.log('client');
			console.log(document.cookie);
			// Client-side, tarayıcı cookie’sini kullan
			options.headers = {
				...(options.headers || {}),
				cookie: document.cookie || '',
			};
		}
		return fetch(url, options);
	};

	const directus = createDirectus<Schema>(joinURL(config.public.siteUrl, '/api/proxy'), {
		globals: {
			fetch: fetchUtils, //$fetch //fetchUtils,

			/* (url, options = {}) => {
				// SSR ise headers.cookie ekle
				if (process.server) {
					const event = nuxtApp.ssrContext?.event;
					console.log('event', event);
					if (event) {
						options.headers = {
							...(options.headers || {}),
							cookie: event.node.req.headers.cookie || '',
						};
					}
				}
				return fetch(url, options);
			} */
		},
	})
		.with(authentication('session'))
		.with(rest());

	// ** Live Preview Bits **
	// Check if we are in preview mode
	const preview = route.query.preview && route.query.preview === 'true';
	const token = route.query.token as string | undefined;

	// If we are in preview mode, we need to use the token from the query string
	if (preview && token) {
		directus.setToken(token);

		nuxtApp.hook('page:finish', () => {
			refreshNuxtData();
		});
	}

	return {
		provide: {
			directus,
		},
	};
});
