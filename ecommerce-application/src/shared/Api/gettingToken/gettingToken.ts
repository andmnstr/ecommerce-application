import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { createClientWitAnonimousToken } from '../createClientWithAnonymousToken';
import { createClientWithExistingToken } from '../createClientWithExistingToken';
import { createClientWithRefreshedToken } from '../createClientWithRefreshedToken';
import { isTokenStore } from '../Lib/isTokenStore';

export const gettingToken = (): ByProjectKeyRequestBuilder => {
  const storageItem = localStorage.getItem('access_token');
  let token = '';
  if (storageItem) {
    const tokenStore: unknown = JSON.parse(storageItem);
    if (isTokenStore(tokenStore)) {
      token = tokenStore.token;
      if (typeof token === 'string') {
        createClientWithRefreshedToken(token);
        return createClientWithExistingToken();
      }
    }
    return createClientWitAnonimousToken();
  }
  return createClientWitAnonimousToken();
};
