import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type React from 'react';

import { removeItem } from '../../api/removeItem';

interface ItemQuantityChangeProps {
  cartId: string;
  cartVersion: number;
  itemId: string;
  setCartChange: () => void;
}

export const RemoveItemButton: React.FC<ItemQuantityChangeProps> = ({ cartId, cartVersion, itemId, setCartChange }) => {
  const handleRemoveItem = async (): Promise<void> => {
    await removeItem(cartId, cartVersion, itemId);
    setCartChange();
  };
  return (
    <IconButton
      aria-label="Delete"
      onClick={() => {
        handleRemoveItem();
      }}
    >
      <DeleteForever />
    </IconButton>
  );
};
