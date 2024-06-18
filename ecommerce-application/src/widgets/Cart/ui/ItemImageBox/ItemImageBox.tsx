import { Box } from '@mui/material';
import type React from 'react';

import classes from '../UserCart.module.scss';

interface ItemImageBoxProps {
  imagePath: string;
}

export const ItemImageBox: React.FC<ItemImageBoxProps> = ({ imagePath }) => {
  return (
    <Box
      component="img"
      alt="product_image"
      src={imagePath}
      className={classes.CartItemImage}
    />
  );
};
