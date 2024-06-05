import type { ByProjectKeyRequestBuilder, ProductProjection } from '@commercetools/platform-sdk';

export const getCurrentProductData = async (
  apiRoot: ByProjectKeyRequestBuilder,
  id: string
): Promise<ProductProjection> => {
  const products = await apiRoot.productProjections().withId({ ID: id }).get().execute();
  return products.body;
};
