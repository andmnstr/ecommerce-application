import { getApiRoot } from '../../../shared';

export const clearCart = async (cartId: string, version: number): Promise<void> => {
  await getApiRoot().me().carts().withId({ ID: cartId }).delete({ queryArgs: { version } }).execute();
};
