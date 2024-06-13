import { getApiRoot } from '../../../shared';

export const removeItem = async (cartId: string, version: number, id: string, quantity?: number): Promise<void> => {
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
            quantity,
          },
        ],
      },
    })
    .execute();
};
