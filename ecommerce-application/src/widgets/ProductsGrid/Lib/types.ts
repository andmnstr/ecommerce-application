import type { ProductProjection } from '@commercetools/platform-sdk';

export interface IProducts {
  products: ProductProjection[];
  action: 'none' | 'filter' | 'search';
}

export interface IColorValue {
  'ru-RU': string;
}
