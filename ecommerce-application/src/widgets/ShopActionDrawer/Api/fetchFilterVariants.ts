import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { isColorValue } from '../Lib/predicate';

interface IFilterVariants {
  categories: string[];
  colors: string[];
}

export const fetchFilterVariants = async (apiRoot: ByProjectKeyRequestBuilder): Promise<IFilterVariants> => {
  const filterVariants: IFilterVariants = {
    categories: [],
    colors: [],
  };
  const products = (await apiRoot.productProjections().search().get().execute()).body.results;
  products.map(product => {
    const category = product.categories[0].typeId;
    if (!filterVariants.categories.includes(category)) {
      filterVariants.categories.push(category);
    }
    product.variants.map(variant => {
      if (variant.attributes) {
        const color = variant.attributes.find(item => {
          return item.name === 'color';
        });
        if (color && isColorValue(color.value) && !filterVariants.colors.includes(color.value['ru-RU'])) {
          filterVariants.colors.push(color.value['ru-RU']);
        }
      }
      return variant;
    });
    return product;
  });
  return filterVariants;
};
