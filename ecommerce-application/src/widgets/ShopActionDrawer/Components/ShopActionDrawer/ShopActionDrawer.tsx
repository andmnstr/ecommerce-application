import { Box, Drawer } from '@mui/material';
import type React from 'react';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import type { ICategory, IDrawerOptions, IFilters, IPrice, Sort } from '../../Lib/types';
import { FilterGroup } from '../Actions';
import { SortGroup } from '../Actions/SortGroup/SortGroup';
import classes from './ShopActionDrawer.module.scss';

const isInputElement = (value: unknown): value is HTMLInputElement => {
  return true;
};

const isSort = (value: unknown): value is Sort => {
  return true;
};

export const ShopActionDrawer: React.FC<IDrawerOptions> = ({ open, onClose, onClick }) => {
  const [filterValues, setFilterValues] = useState<IFilters>({
    colors: [],
    categories: [],
    prices: [],
  });
  const [sortValue, setSortValue] = useState<Sort>();
  const handleColorChange = useCallback((selectedColors: string[]): void => {
    setFilterValues(currentFilters => {
      return {
        ...currentFilters,
        colors: selectedColors,
      };
    });
  }, []);

  const location = useLocation();

  const subCategoryPaths = ['Trousers', 'Dresses', 'Sweatshirts', 'Shoes', 'Sneakers', 'Bags', 'Glasses'];

  const hasCategoryGroup = (pathname: string): boolean => {
    if (
      subCategoryPaths.some(path => {
        return pathname.includes(path);
      })
    ) {
      return false;
    }
    return true;
  };

  const handleCategoryChange = useCallback((selectedCategories: ICategory[]): void => {
    setFilterValues(currentFilters => {
      return {
        ...currentFilters,
        categories: selectedCategories,
      };
    });
  }, []);

  const handlePriceChange = useCallback((selectedPrices: IPrice[]): void => {
    setFilterValues(currentFilters => {
      return {
        ...currentFilters,
        prices: selectedPrices,
      };
    });
  }, []);
  const sortOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (isInputElement(event.target) && isSort(event.target.value)) {
      setSortValue(event.target.value);
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      className={classes.drawer}
    >
      <Box className={classes.container}>
        <FilterGroup
          onColorChange={handleColorChange}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
          hasCategoryGroup={hasCategoryGroup(location.pathname)}
        />
        <SortGroup onChange={sortOnChange} />
        <CustomButton
          variant="contained"
          className={classes.button}
          onClick={() => {
            onClick(filterValues, sortValue);
          }}
        >
          Show
        </CustomButton>
      </Box>
    </Drawer>
  );
};
