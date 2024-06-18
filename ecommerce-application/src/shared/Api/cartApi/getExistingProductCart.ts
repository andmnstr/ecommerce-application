import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

import { getApiRoot } from '../apiRoot';

export const getExistingProductCart = async (): Promise<ClientResponse<Cart>> => {
  const activeCart = await getApiRoot().me().activeCart().get().execute();
  return activeCart;
};
