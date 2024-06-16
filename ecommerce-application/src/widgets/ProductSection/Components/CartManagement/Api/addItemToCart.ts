import { DISTRIBUTION_CHANNEL, getApiRoot } from '../../../../../shared';

export const addItemToCart = async (cartId: string, version: number, sku: string, key: string): Promise<void> => {
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
            key,
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
};
