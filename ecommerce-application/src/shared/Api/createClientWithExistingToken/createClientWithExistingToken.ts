import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { ExistingTokenMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import { accessToken } from '../Lib/const';
import { isTokenStore } from '../Lib/isTokenStore';

const { VITE_PROJECT_KEY, VITE_API_URL } = import.meta.env;

export const createClientWithExistingToken = (): ByProjectKeyRequestBuilder => {
  const storageItem = localStorage.getItem(accessToken);
  let token = '';
  let authorization = '';
  if (storageItem) {
    const tokenStore: unknown = JSON.parse(storageItem);
    if (isTokenStore(tokenStore)) {
      token = tokenStore.token;
    }
    if (typeof tokenStore === 'string') {
      authorization = `Bearer ${token}`;
    }
  }

  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_API_URL,
    fetch,
  };

  const client = new ClientBuilder()
    .withExistingTokenFlow(authorization, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: VITE_PROJECT_KEY });

  return apiRoot;
};
