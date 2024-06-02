import type { ByProjectKeyRequestBuilder, ProductProjection } from '@commercetools/platform-sdk';

import type { IFilters, Sort } from '../../../widgets/ShopActionDrawer/Lib/types';

interface IFetchProducts {
  products: ProductProjection[];
  action: 'none' | 'filter' | 'search';
  sort: Sort;
}

export const fetchAccessoriesBags = async (
  apiRoot: ByProjectKeyRequestBuilder,
  filter: IFilters,
  sort?: Sort,
  search?: string
): Promise<IFetchProducts> => {
  let products: ProductProjection[];
  let action: 'none' | 'filter' | 'search';
  let sortParam = '';
  let searchParam = '';

  const parentCategory = await apiRoot.categories().withKey({ key: 'bags' }).get().execute();
  const parentId = parentCategory.body.id || '';

  if (sort === 'name') {
    sortParam = 'name.ru-Ru asc';
  }
  if (search) {
    searchParam = search;
  }
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
    let priceFilter = '';
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

    if (filter.prices.length) {
      const [priceRange] = filter.prices;
      const { from, to } = priceRange;
      priceFilter = `variants.prices.value.centAmount:range (${from} to ${to})`;
    }

    products = (
      await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [colorFilter, categoriesFilter, priceFilter],
            markMatchingVariants: true,
            ...(sortParam && { sort: sortParam }),
            ...(searchParam && { 'filter.query': [`name.ru-RU:"${searchParam}"`] }),
          },
        })
        .execute()
    ).body.results;
    action = 'filter';
  } else {
    products = (
      await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: `categories.id:"${parentId}"`,
            markMatchingVariants: true,
            ...(sortParam && { sort: sortParam }),
            ...(searchParam && { 'filter.query': [`name.ru-RU:"${searchParam}"`] }),
          },
        })
        .execute()
    ).body.results;
    action = 'none';
  }
  return { products, action, sort };
};
