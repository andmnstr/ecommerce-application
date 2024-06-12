import type { Cart } from '@commercetools/platform-sdk';

import { getApiRoot } from '../../../shared';

export const getCart = async (): Promise<Cart | undefined> => {
  try {
    const response = await getApiRoot().me().activeCart().get().execute();
    return response.body;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
