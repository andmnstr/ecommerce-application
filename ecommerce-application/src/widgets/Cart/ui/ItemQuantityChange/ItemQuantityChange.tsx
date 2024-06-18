import { Add, Remove } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import type React from 'react';

import { addItem } from '../../api/addItem';
import { removeItem } from '../../api/removeItem';
import type { ICartItemsData } from '../../types/UserCart.types';
import classes from '../UserCart.module.scss';

interface ItemQuantityChangeProps {
  cartId: string;
  cartVersion: number;
  item: ICartItemsData;
  setCartChange: () => void;
}

export const ItemQuantityChange: React.FC<ItemQuantityChangeProps> = ({ cartId, cartVersion, item, setCartChange }) => {
  const handleAddItem = async (): Promise<void> => {
    await addItem(cartId, cartVersion, item.sku);
    setCartChange();
  };

  const handleRemoveItem = async (): Promise<void> => {
    await removeItem(cartId, cartVersion, item.id, 1);
    setCartChange();
  };
  return (
    <Stack className={classes.ItemQuantity}>
      <IconButton
        aria-label="Remove"
        onClick={() => {
          handleRemoveItem();
        }}
      >
        <Remove />
      </IconButton>
      <Typography>{item.quantity}</Typography>
      <IconButton
        aria-label="Add"
        onClick={() => {
          handleAddItem();
        }}
      >
        <Add />
      </IconButton>
    </Stack>
  );
};
