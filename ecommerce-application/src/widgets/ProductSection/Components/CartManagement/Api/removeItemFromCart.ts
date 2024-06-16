import { getApiRoot } from '../../../../../shared';

export const removeItemFromCart = async (
  cartId: string,
  version: number,
  key: string,
  quantity?: number
): Promise<void> => {
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
            lineItemKey: key,
            quantity: quantity ?? 1,
          },
        ],
      },
    })
    .execute();
};
