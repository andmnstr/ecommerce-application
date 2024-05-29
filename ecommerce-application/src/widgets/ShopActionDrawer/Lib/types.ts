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

export interface IFilterProps {
  onColorChange: (selectedColors: string[]) => void;
  onCategoryChange: (selectedCategories: ICategory[]) => void;
  onPriceChange: (selectedPrices: number[]) => void;
}

export interface IFilters {
  colors: string[];
  categories: ICategory[];
  prices: number[];
}

export interface IDrawerOptions {
  open: boolean;
  onClose: () => void;
  onClick: (newFilter: IFilters) => void;
}
