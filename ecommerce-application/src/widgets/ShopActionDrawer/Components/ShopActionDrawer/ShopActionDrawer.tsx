import { Box, Drawer } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { FilterGroup } from '../Actions';
import classes from './ShopActionDrawer.module.scss';

interface IDrawerOptions {
  open: boolean;
  onClose: () => void;
  onClick: (newFilter: string) => void;
}

const isInputElement = (value: unknown): value is HTMLInputElement => {
  return true;
};

export const ShopActionDrawer: React.FC<IDrawerOptions> = ({ open, onClose, onClick }) => {
  const [filterValue, setFilterValue] = useState('');
  const filterOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (isInputElement(event.target)) {
      setFilterValue(event.target.value);
    }
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className={classes.drawer}
    >
      <Box className={classes.container}>
        <FilterGroup onChange={filterOnChange} />
        <CustomButton
          variant="contained"
          className={classes.button}
          onClick={() => {
            onClick(filterValue);
          }}
        >
          Show
        </CustomButton>
      </Box>
    </Drawer>
  );
};
