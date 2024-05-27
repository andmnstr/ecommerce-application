import type { ByProjectKeyRequestBuilder, ProductProjection } from '@commercetools/platform-sdk';

interface IFetchProducts {
  products: ProductProjection[];
  action: 'none' | 'filter' | 'search';
}

export const fetchProducts = async (apiRoot: ByProjectKeyRequestBuilder, filter?: string): Promise<IFetchProducts> => {
  let products: ProductProjection[];
  let action: 'none' | 'filter' | 'search';
  if (filter) {
    products = (
      await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: ['variants.prices.value.centAmount:range (2000 to 3000)'],
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
