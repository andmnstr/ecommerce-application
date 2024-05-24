import type { ByProjectKeyRequestBuilder, ProductProjection } from '@commercetools/platform-sdk';

export const fetchProducts = async (apiRoot: ByProjectKeyRequestBuilder): Promise<ProductProjection[]> => {
  const products = await apiRoot.productProjections().search().get().execute();
  return products.body.results;
};
