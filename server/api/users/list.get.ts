import { readUsers } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { limit = 10, offset = 0, search } = query;

    // Get authentication token
    const cookies = parseCookies(event);
    const headers = getHeaders(event);

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

    // Build filter for search
    const filter: any = {};
    if (search) {
      filter._or = [
        { first_name: { _icontains: search } },
        { last_name: { _icontains: search } },
        { email: { _icontains: search } },
      ];
    }

    // Get users with token
    const users = await directusServer.request(
      withToken(
        authToken,
        readUsers({
          filter,
          limit: Number(limit),
          offset: Number(offset),
        })
      )
    );

    return {
      users,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        total: users.length,
      },
      message: "Users retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching users:", error);

    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || "Failed to fetch users",
    });
  }
});
