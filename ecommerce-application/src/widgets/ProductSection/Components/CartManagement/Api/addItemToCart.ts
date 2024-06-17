import { DISTRIBUTION_CHANNEL, getApiRoot } from '../../../../../shared';

export const addItemToCart = async (cartId: string, version: number, sku: string): Promise<number> => {
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
    .execute()
    .then(response => {
      cartVersion = response.body.version;
    });

  return cartVersion;
};
