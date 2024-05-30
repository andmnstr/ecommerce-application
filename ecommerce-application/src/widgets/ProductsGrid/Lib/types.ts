import type {
  CategoryReference,
  LocalizedString,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';

import type { Sort } from '../../ShopActionDrawer/Lib/types';

export interface IProducts {
  products: ProductProjection[];
  action: 'none' | 'filter' | 'search';
  sort: Sort;
}

export interface IColorValue {
  'ru-RU': string;
}

export interface IColors {
  id: string;
  color: string;
}

export interface IVariants {
  variant: ProductVariant;
  productId: string;
  productDescription: LocalizedString;
  productKey: string;
  productCategories: CategoryReference[];
  productName: LocalizedString;
}
