import { DISTRIBUTION_CHANNEL, getApiRoot } from '../../../shared';

export const addItem = async (cartId: string, version: number, sku: string): Promise<void> => {
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
};
