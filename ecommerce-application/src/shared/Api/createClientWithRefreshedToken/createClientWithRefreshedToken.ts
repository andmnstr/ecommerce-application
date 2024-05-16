import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { HttpMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

const { VITE_PROJECT_KEY, VITE_CLIENT_SECRET, VITE_CLIENT_ID, VITE_AUTH_URL, VITE_API_URL } = import.meta.env;

export const createClientWithRefreshedToken = (token: string): ByProjectKeyRequestBuilder => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
    },
    refreshToken: token,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_API_URL,
    fetch,
  };

  const client = new ClientBuilder()
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client, VITE_API_URL).withProjectKey({ projectKey: VITE_PROJECT_KEY });

  return apiRoot;
};
