import { $fetch } from "ofetch";
import type { Schema } from "#shared/types/schema";
import {
  aggregate,
  createDirectus,
  readItem,
  readItems,
  rest,
  readSingleton,
  createItem,
  updateItem,
  staticToken,
  uploadFiles,
  readMe,
  withToken,
  type QueryFilter,
  readUser,
  authentication,
} from "@directus/sdk";
import { joinURL } from "ufo";
const {
  public: { directusUrl },
  directusServerToken,
} = useRuntimeConfig();

// By default, we use the Public permissions to fetch content (even on the server side). If you want to restrict public access it's recommended to use the staticToken option.
const directusServer = createDirectus<Schema>(directusUrl as string, {
  globals: {
    fetch: $fetch,
  },
})
  .with(rest())
  .with(staticToken(directusServerToken as string));

/* const directusFactory = (event: any) => {
  const customFetch = (request: RequestInfo, options: any = {}) => {
    if (process.server && event?.node?.req?.headers?.cookie) {
      options.headers = {
        ...(options.headers || {}),
        cookie: event.node.req.headers.cookie,
      };
    }
    return $fetch(request, options);
  };

  return createDirectus<Schema>(directusUrl as string, {
    globals: {
      fetch: customFetch,
    },
  })
    .with(authentication("session"))
    .with(rest());
}; */

export {
  directusServer,
  directusFactory,
  readItem,
  readItems,
  readMe,
  readSingleton,
  createItem,
  updateItem,
  withToken,
  aggregate,
  uploadFiles,
  readUser,
};
export type { QueryFilter };
