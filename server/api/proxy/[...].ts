import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const cookies = parseCookies(event);

  console.log("=== PROXY DEBUG ===");
  console.log("Headers:", headers);
  console.log("Cookies:", cookies);
  console.log("Path:", event.path);
  console.log("Method:", event.method);
  console.log("==================");

  const config = useRuntimeConfig();

  if (!config.public.directus.rest.baseUrl) {
    throw new Error("Missing `runtimeConfig.apiURL` configuration.");
  }

  const target = joinURL(
    config.public.directus.rest.baseUrl,
    event.path.replace(/^\/api\/proxy\//, "")
  );

  return proxyRequest(event, target, {
    /* 	headers: {
			// Tarayıcı göndermese bile test için elle ekle
			cookie: `directus_session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NGQ0MmNhLTAzZjctNDQ2Zi1hODc1LTIyMDkyMDBlZGEwYSIsInJvbGUiOiJjMjhjYTI0NC0zMzM0LTQ0MWMtODUyZC02NDcxNzg1ZTEyMDIiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsInNlc3Npb24iOiJHYmdJS25jRFFlbDJ4OHhQZzEzMjJ1NmNQOHhYX3VfZ1Q0b25jNmhzWXE4ZWdIWno1ZW91MXBRWHYtRFVmSUN1IiwiaWF0IjoxNzU4OTU3OTIwLCJleHAiOjE3NTkwNDQzMjAsImlzcyI6ImRpcmVjdHVzIn0.wD_MYRjijsCnecugGPCa1AHnK6xIqjtsR0zgtGSo0K0`,
		}, */
    cookieDomainRewrite: new URL(config.public.siteUrl).hostname,
    cookiePathRewrite: "/",
  });
});
