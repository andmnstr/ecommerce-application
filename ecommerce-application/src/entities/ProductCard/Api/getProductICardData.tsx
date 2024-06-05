import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import type { IProductCardData } from '../Lib/type';

export const getProductCardData = async (
  apiRoot: ByProjectKeyRequestBuilder,
  productId: string,
  categoryId: string,
  productLink: string
): Promise<IProductCardData> => {
  const productCardData: IProductCardData = { categoryName: '', subcategoryName: '', productName: '', id: '' };
  const subCategoryData = await apiRoot.categories().withId({ ID: categoryId }).get().execute();
  const subCategoryResponse = subCategoryData.body;

  if (subCategoryResponse.key !== undefined) {
    const parentCategoryId = subCategoryResponse.parent?.id;

    if (parentCategoryId !== undefined) {
      const categoryData = await apiRoot.categories().withId({ ID: parentCategoryId }).get().execute();

      const productCategory = categoryData.body.slug['ru-RU'];
      const productSubCategory = subCategoryResponse.slug['ru-RU'];

      productCardData.categoryName = productCategory;
      productCardData.subcategoryName = productSubCategory;
    }
  }
  productCardData.productName = productLink;
  productCardData.id = productId;
  console.log(subCategoryResponse);
  return productCardData;
};
