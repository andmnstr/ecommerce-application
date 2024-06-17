import { getApiRoot } from '../../../../../shared';

export const removeItemFromCart = async (
  cartId: string,
  version: number,
  id: string,
  quantity?: number
): Promise<number> => {
  let cartVersion: number = 0;

  await getApiRoot()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: id,
            quantity: quantity ?? 1,
          },
        ],
      },
    })
    .execute()
    .then(response => {
      cartVersion = response.body.version;
    });

  return cartVersion;
};
