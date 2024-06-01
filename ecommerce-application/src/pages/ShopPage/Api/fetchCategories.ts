import type {
  ByProjectKeyRequestBuilder,
  CategoryPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';

interface IProductCategories {
  category: string;
  subcategory: string;
}

interface IProductCategoriesSubcategories {
  category: string;
  subcategory: string[];
}

export const fetchCategories = async (
  apiRoot: ByProjectKeyRequestBuilder
): Promise<IProductCategoriesSubcategories[] | undefined> => {
  const categories: ClientResponse<CategoryPagedQueryResponse> = await apiRoot.categories().get().execute();
  const responseLength = categories.body.results.length;
  const response = responseLength ? categories.body.results : undefined;
  const productCategories: IProductCategories[] = [];
  const sortedCategoriesList: IProductCategoriesSubcategories[] = [];

  if (response) {
    response.forEach(item => {
      let categoryName = '';
      let subCategoryName = '';

      if (item.parent) {
        subCategoryName = item.name['ru-RU'];
        categoryName = item.parent.id;
      } else {
        categoryName = item.name['ru-RU'];
      }

      const result = {
        category: categoryName,
        subcategory: subCategoryName,
      };

      productCategories.push(result);
    });
  }

  return sortedCategoriesList;
};
