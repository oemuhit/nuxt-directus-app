export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, "key");
  if (!key) {
    throw createError({ statusCode: 400, message: "Key is required" });
  }
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, message: "Body is required" });
  }
  if (!body[key]) {
    throw createError({ statusCode: 400, message: "Value is required" });
  }

  setCookie(event, key, body[key].toString());
});
