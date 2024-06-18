import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import type { ICategory, IValue } from '../Lib/types';

const isValue = (value: unknown): value is IValue => {
  return true;
};

export const fetchFilterColors = async (apiRoot: ByProjectKeyRequestBuilder): Promise<string[]> => {
  const filterColors: string[] = [];
  const products = (await apiRoot.productProjections().search().get().execute()).body.results;
  products.map(product => {
    product.variants.map(variant => {
      if (variant.attributes) {
        const color = variant.attributes.find(item => {
          return item.name === 'color';
        });
        if (color && isValue(color.value) && !filterColors.includes(color.value['ru-RU'])) {
          filterColors.push(color.value['ru-RU']);
        }
      }
      return variant;
    });
    return product;
  });
  return filterColors;
};

export const fetchFilterCategories = async (apiRoot: ByProjectKeyRequestBuilder): Promise<ICategory[]> => {
  const filterCategories: ICategory[] = [];
  const categories = (await apiRoot.categories().get().execute()).body.results;
  categories.map(category => {
    const name = category.name['ru-RU'];
    const { id } = category;
    filterCategories.push({ name, id });
    return category;
  });
  const productsId: string[] = [];
  const products = (
    await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: 200,
        },
      })
      .execute()
  ).body.results;
  products.map(product => {
    productsId.push(product.categories[0].id);
    return product;
  });

  return filterCategories.filter(item => {
    return productsId.includes(item.id);
  });
};
