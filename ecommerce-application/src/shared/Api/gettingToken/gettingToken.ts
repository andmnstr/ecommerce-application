import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { createClientWitAnonimousToken } from '../createClientWithAnonymousToken';
import { createClientWithExistingToken } from '../createClientWithExistingToken';
import { createClientWithRefreshedToken } from '../createClientWithRefreshedToken';
import { accessToken } from '../Lib/const';
import { isTokenStore } from '../Lib/isTokenStore';

export const gettingToken = (): ByProjectKeyRequestBuilder => {
  const storageItem = localStorage.getItem(accessToken);
  let refreshToken;
  if (storageItem) {
    const tokenStore: unknown = JSON.parse(storageItem);
    if (isTokenStore(tokenStore)) {
      refreshToken = tokenStore.refreshToken;
      if (typeof refreshToken === 'string') {
        createClientWithRefreshedToken(refreshToken);
        return createClientWithExistingToken();
      }
    }
    return createClientWitAnonimousToken();
  }
  return createClientWitAnonimousToken();
};
