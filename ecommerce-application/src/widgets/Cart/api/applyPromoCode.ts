import { getApiRoot } from '../../../shared';

export const applyPromoCode = async (cartId: string, version: number, value: string): Promise<void> => {
  await getApiRoot()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code: value,
          },
        ],
      },
    })
    .execute();
};
