export default defineEventHandler(async (event) => {
  try {
    // Get authentication token from cookies or headers
    const cookies = parseCookies(event);
    const headers = getHeaders(event);

    // Try to get token from different sources
    const authToken =
      cookies.authenticated === "true"
        ? cookies.directus_session_token
        : headers.authorization?.replace("Bearer ", "");

    if (!authToken) {
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication required",
      });
    }

    // Get current user with token
    const user = await directusServer.request(
      withToken(
        authToken,
        readMe({
          fields: ["*", { contacts: ["*"] }],
        })
      )
    );

    return {
      user,
      message: "User data retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching user:", error);

    return sendError(
      event,
      createError({
        statusCode: error.status || 500,
        statusMessage: error.message || "Failed to fetch user data",
      })
    );
  }
});
