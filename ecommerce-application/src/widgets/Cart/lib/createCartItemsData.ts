import type { LineItem } from '@commercetools/platform-sdk';

import type { ICartItemsData } from '../types/UserCart.types';
import { isLocalizedString } from './isLocalizedString';

export const createCartItemsData = (cartItems: LineItem[]): ICartItemsData[] => {
  const cartItemsData = cartItems.reduce((acc: ICartItemsData[], item) => {
    if (
      item.variant.images &&
      item.variant.sku &&
      item.variant.attributes &&
      isLocalizedString(item.variant.attributes[1].value) &&
      item.price.discounted
    ) {
      const itemData = {
        id: item.id,
        sku: item.variant.sku,
        image: item.variant.images[0].url,
        name: item.name['ru-RU'],
        size: item.variant.attributes[1].value['ru-RU'],
        price: (item.price.discounted.value.centAmount / 100).toFixed(2),
        quantity: item.quantity,
        totalItemPrice: (item.totalPrice.centAmount / 100).toFixed(2),
      };
      acc.push(itemData);
    }
    return acc;
  }, []);

  return cartItemsData;
};
