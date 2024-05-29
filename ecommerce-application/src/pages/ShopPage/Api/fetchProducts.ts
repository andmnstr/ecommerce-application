import type { ByProjectKeyRequestBuilder, ProductProjection } from '@commercetools/platform-sdk';

import type { IFilters } from '../../../widgets/ShopActionDrawer/Lib/types';

interface IFetchProducts {
  products: ProductProjection[];
  action: 'none' | 'filter' | 'search';
}

export const fetchProducts = async (apiRoot: ByProjectKeyRequestBuilder, filter: IFilters): Promise<IFetchProducts> => {
  let products: ProductProjection[];
  let action: 'none' | 'filter' | 'search';
  if (
    Object.values(filter).some(item => {
      if (Array.isArray(item)) {
        return item.length > 0;
      }
      return item;
    })
  ) {
    let colorFilter = '';
    let categoriesFilter = '';
    // const priceFilter = [];
    if (filter.colors.length) {
      const colors = filter.colors
        .map(color => {
          return `"${color}"`;
        })
        .join(',');
      colorFilter = `variants.attributes.color.ru-RU:${colors}`;
    }
    if (filter.categories.length) {
      const categories = filter.categories
        .map(category => {
          return `"${category.id}"`;
        })
        .join(',');
      categoriesFilter = `categories.id:${categories}`;
    }
    products = (
      await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [colorFilter, categoriesFilter],
            markMatchingVariants: true,
          },
        })
        .execute()
    ).body.results;
    action = 'filter';
  } else {
    products = (await apiRoot.productProjections().search().get().execute()).body.results;
    action = 'none';
  }
  return { products, action };
};
