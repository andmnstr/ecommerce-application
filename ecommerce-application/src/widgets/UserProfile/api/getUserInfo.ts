import type { Customer } from '@commercetools/platform-sdk';

import { getApiRoot, TOKEN_NAME } from '../../../shared';
import { isTokenStore } from '../../../shared/Api/Lib/isTokenStore';

export const getUserInfo = async (): Promise<Customer | undefined> => {
  const storageItem: string | null = localStorage.getItem(TOKEN_NAME);
  let accessToken = '';

  if (storageItem) {
    const tokenStore: unknown = JSON.parse(storageItem);
    if (isTokenStore(tokenStore)) {
      accessToken = tokenStore.token;
      const user = await getApiRoot()
        .me()
        .get({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .execute();
      const userInfo = user.body;
      return userInfo;
    }
  }

  return undefined;
};
