export interface IValue {
  'ru-RU': string;
}

export interface IFilterVariants {
  categories: string[];
  colors: string[];
}

export interface ICategory {
  name: string;
  id: string;
}

export interface IPrice {
  from: number;
  to: number;
}

export type Sort = 'ascending' | 'descending' | 'name' | undefined;

export interface IFilterProps {
  onColorChange: (selectedColors: string[]) => void;
  onCategoryChange: (selectedCategories: ICategory[]) => void;
  onPriceChange: (selectedPrices: IPrice[]) => void;
  hasCategoryGroup: boolean;
}

export interface IFilters {
  colors: string[];
  categories: ICategory[];
  prices: IPrice[];
}

export interface IDrawerOptions {
  open: boolean;
  onClose: () => void;
  onClick: (newFilter: IFilters, newSort: Sort) => void;
}

export interface ISortProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
