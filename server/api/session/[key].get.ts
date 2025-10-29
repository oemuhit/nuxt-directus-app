export default defineEventHandler((event) => {
  const key = getRouterParam(event, "key");

  if (!key) {
    throw createError({ statusCode: 400, message: "Key is required" });
  }

  let cookieValue = getCookie(event, key) || 0;

  console.log("cookie", cookieValue);
  return { [key]: cookieValue || null };
});
