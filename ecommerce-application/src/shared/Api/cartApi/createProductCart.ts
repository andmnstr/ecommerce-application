import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

import { CART_ID } from '../../consts/cartId';
import { getApiRoot } from '../apiRoot';

export const createProductCart = async (): Promise<ClientResponse<Cart>> => {
  const body = {
    currency: 'EUR',
  };
  const newCart = await getApiRoot().me().carts().post({ body }).execute();
  localStorage.setItem(CART_ID, newCart.body.id);
  return newCart;
};
