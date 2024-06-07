import type {
  CategoryReference,
  LocalizedString,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';
import type { SubmitHandler } from 'react-hook-form';

import type { Sort } from '../../ShopActionDrawer/Lib/types';

export interface ISearchField {
  search: string;
}

export interface IProducts {
  products: ProductProjection[];
  action: 'none' | 'filter' | 'search';
  sort: Sort;
  onSearch: SubmitHandler<ISearchField>;
  toStartPage: boolean;
}

export interface IFormProps {
  onSubmit: SubmitHandler<ISearchField>;
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
