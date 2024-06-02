import type {
  ByProjectKeyRequestBuilder,
  CategoryPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';

import type { IProductCategories } from '../lib/types';

export const fetchCategories = async (
  apiRoot: ByProjectKeyRequestBuilder
): Promise<IProductCategories[] | undefined> => {
  const categories: ClientResponse<CategoryPagedQueryResponse> = await apiRoot.categories().get().execute();
  const responseLength = categories.body.results.length;
  const response = responseLength ? categories.body.results : undefined;
  const productCategories: IProductCategories[] = [];
  const sortedCategoriesList: IProductCategories[] = [];
  let subCategories: string[] = [];

  if (response) {
    response.forEach(item => {
      let categoryName = '';
      let subCategoryName = '';

      if (item.parent) {
        subCategoryName = item.name['ru-RU'];
        categoryName = item.parent.id;

        const result = {
          category: categoryName,
          subcategory: [subCategoryName],
        };
        productCategories.push(result);
      }
    });

    productCategories.reduce((init, value, index) => {
      const categoryName = index === productCategories.length - 1 ? value.category : init.category;

      if (!subCategories.length) {
        subCategories.push(...init.subcategory);
      }

      if (init.category === value.category) {
        subCategories.push(...value.subcategory);
      }
      if (init.category !== value.category || index === productCategories.length - 1) {
        sortedCategoriesList.push({ category: categoryName, subcategory: [...subCategories] });
        subCategories = [];
      }
      return value;
    });
  }

  return sortedCategoriesList;
};
