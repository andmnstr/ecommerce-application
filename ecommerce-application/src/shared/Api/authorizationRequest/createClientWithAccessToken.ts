import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { HttpMiddlewareOptions, PasswordAuthMiddlewareOptions, TokenStore } from '@commercetools/sdk-client-v2';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import { accessToken } from '../Lib/const';
import { isTokenStore } from '../Lib/isTokenStore';

const { VITE_PROJECT_KEY, VITE_CLIENT_SECRET, VITE_CLIENT_ID, VITE_AUTH_URL, VITE_API_URL, VITE_SCOPES } = import.meta
  .env;

export const createClientWithAccessToken = async (
  email: string,
  password: string
): Promise<ByProjectKeyRequestBuilder> => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes: [VITE_SCOPES],
    tokenCache: {
      get: (): TokenStore => {
        const storageItem = localStorage.getItem(accessToken);
        let token: unknown;
        if (storageItem) {
          token = JSON.parse(storageItem);
        }
        return isTokenStore(token) ? token : { token: '', expirationTime: 0 };
      },
      set: (cache: TokenStore) => {
        localStorage.setItem(accessToken, JSON.stringify(cache));
        return cache;
      },
    },
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_API_URL,
    fetch,
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client, VITE_API_URL).withProjectKey({ projectKey: VITE_PROJECT_KEY });
  await apiRoot.me().get().execute();
  return apiRoot;
};
