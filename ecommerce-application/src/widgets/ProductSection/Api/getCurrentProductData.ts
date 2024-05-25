import type { ByProjectKeyRequestBuilder, ProductProjection } from '@commercetools/platform-sdk';

export const getCurrentProductData = async (
  apiRoot: ByProjectKeyRequestBuilder,
  id: string
): Promise<ProductProjection> => {
  const products = await apiRoot.productProjections().withKey({ key: id }).get().execute();
  return products.body;
};
