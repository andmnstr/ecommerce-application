import type { ByProjectKeyRequestBuilder, Category, ClientResponse } from '@commercetools/platform-sdk';

export const fetchSubcategories = async (apiRoot: ByProjectKeyRequestBuilder, parent: string): Promise<string> => {
  const categories: ClientResponse<Category> = await apiRoot.categories().withId({ ID: parent }).get().execute();
  const subCategoryName = categories.body.name['ru-RU'] ?? '';

  return subCategoryName;
};
