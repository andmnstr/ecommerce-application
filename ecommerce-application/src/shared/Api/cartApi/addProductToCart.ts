import { CART_ID } from '../../consts/cartId';
import { DISTRIBUTION_CHANNEL } from '../../consts/distributionChannel';
import { getApiRoot } from '../apiRoot';
import { createProductCart } from './createProductCart';
import { getExistingProductCart } from './getExistingProductCart';

export const addProductToCart = async (sku: string): Promise<void> => {
  let version = 0;
  let cartId = '';
  const id = localStorage.getItem(CART_ID);
  if (id && typeof id === 'string') {
    cartId = id;
  }
  try {
    const cart = await getExistingProductCart();
    version = cart.body.version;
    cartId = cart.body.id;
    localStorage.setItem(CART_ID, cart.body.id);
  } catch {
    const cart = await createProductCart();
    version = cart.body.version;
    cartId = cart.body.id;
  } finally {
    await getApiRoot()
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'setCountry',
              country: 'EU',
            },
            {
              action: 'addLineItem',
              sku,
              quantity: 1,
              distributionChannel: {
                typeId: 'channel',
                id: DISTRIBUTION_CHANNEL,
              },
            },
          ],
        },
      })
      .execute();
  }
};
