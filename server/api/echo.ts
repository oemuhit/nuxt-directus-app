export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const headers = getHeaders(event);

  console.log("Cookies:", cookies);
  console.log("Headers:", headers);

  try {
    // Example 1: Get current user (if authenticated)
    let currentUser = null;
    try {
      currentUser = await directusServer.request(readMe());
      console.log("Current user:", currentUser);
    } catch (error) {
      console.log("No authenticated user or error:", error.message);
    }

    // Example 2: Get pages with server token
    const pages = await directusServer.request(
      readItems("pages", {
        limit: 5,
        fields: ["id", "title", "permalink"],
      })
    );
    console.log("Pages:", pages);

    // Example 3: Get pages with specific token (for preview)
    const previewToken =
      cookies.preview_token || headers.authorization?.replace("Bearer ", "");
    if (previewToken) {
      try {
        const previewPages = await directusServer.request(
          withToken(
            previewToken,
            readItems("pages", {
              limit: 3,
              fields: ["id", "title", "permalink"],
            })
          )
        );
        console.log("Preview pages:", previewPages);
      } catch (error) {
        console.log("Preview token error:", error.message);
      }
    }

    return {
      cookies,
      headers,
      currentUser,
      pages,
      message: "Directus server API example",
    };
  } catch (error) {
    console.error("Server API error:", error);
    return {
      error: error.message,
      cookies,
      headers,
    };
  }
});
