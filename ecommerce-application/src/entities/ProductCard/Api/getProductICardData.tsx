import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import type { IProductCardData } from '../Lib/type';

export const getProductCardData = async (
  apiRoot: ByProjectKeyRequestBuilder,
  productId: string,
  categoryId: string,
  productLink: string
): Promise<IProductCardData> => {
  const productCardData: IProductCardData = { category: '', subcategory: '', product: '', id: '' };
  const subCategoryData = await apiRoot.categories().withId({ ID: categoryId }).get().execute();
  const subCategoryResponse = subCategoryData.body;

  if (subCategoryResponse.key !== undefined) {
    const parentCategoryId = subCategoryData.body.parent?.id;

    if (parentCategoryId !== undefined) {
      const categoryData = await apiRoot.categories().withId({ ID: parentCategoryId }).get().execute();

      const productCategory = categoryData.body.slug['ru-RU'];
      const productSubCategory = subCategoryData.body.slug['ru-RU'];

      productCardData.category = productCategory;
      productCardData.subcategory = productSubCategory;
    }
  }
  productCardData.product = productId;
  productCardData.id = productLink;

  return productCardData;
};
