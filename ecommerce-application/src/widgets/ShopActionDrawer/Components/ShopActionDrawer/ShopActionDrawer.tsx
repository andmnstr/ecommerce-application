import { Box, Drawer } from '@mui/material';
import type React from 'react';
import { useCallback, useState } from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import type { ICategory, IDrawerOptions, IFilters } from '../../Lib/types';
import { FilterGroup } from '../Actions';
import classes from './ShopActionDrawer.module.scss';

export const ShopActionDrawer: React.FC<IDrawerOptions> = ({ open, onClose, onClick }) => {
  const [filterValues, setFilterValues] = useState<IFilters>({
    colors: [],
    categories: [],
    prices: [],
  });
  const handleColorChange = useCallback((selectedColors: string[]): void => {
    setFilterValues(currentFilters => {
      return {
        ...currentFilters,
        colors: selectedColors,
      };
    });
  }, []);

  const handleCategoryChange = useCallback((selectedCategories: ICategory[]): void => {
    setFilterValues(currentFilters => {
      return {
        ...currentFilters,
        categories: selectedCategories,
      };
    });
  }, []);

  const handlePriceChange = (selectedPrices: number[]): void => {
    setFilterValues(currentFilters => {
      return {
        ...currentFilters,
        prices: selectedPrices,
      };
    });
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
        />
        <CustomButton
          variant="contained"
          className={classes.button}
          onClick={() => {
            onClick(filterValues);
          }}
        >
          Show
        </CustomButton>
      </Box>
    </Drawer>
  );
};
