import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { AnonymousAuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

const { VITE_PROJECT_KEY, VITE_CLIENT_SECRET, VITE_CLIENT_ID, VITE_AUTH_URL, VITE_API_URL, VITE_SCOPES } = import.meta
  .env;

export const createClientWitAnonimousToken = (): ByProjectKeyRequestBuilder => {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
    },
    scopes: [VITE_SCOPES],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_API_URL,
    fetch,
  };

  const client = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client, VITE_API_URL).withProjectKey({ projectKey: VITE_PROJECT_KEY });

  return apiRoot;
};
