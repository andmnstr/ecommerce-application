import type { Cart } from '@commercetools/platform-sdk';

import { getApiRoot } from '../../../../../shared';

export const getCart = async (): Promise<Cart | null> => {
  try {
    const response = await getApiRoot().me().activeCart().get().execute();
    return response.body;
  } catch (error) {
    console.error('Error while getting a current user cart');
  }
  return null;
};
