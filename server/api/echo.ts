export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const headers = getHeaders(event);
  console.log(cookies);
  console.log(headers);
  return { cookies, headers };
});
