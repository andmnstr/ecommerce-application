import { Box, Link, Typography } from '@mui/material';
import type React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import emptyCartImage from '../../../../../public/images/empty_cart_image.png';
import { emptyCartMessages } from '../../consts/emptyCartMessages';
import classes from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <Box className={classes.EmptyCartBox}>
      <Box
        className={classes.EmptyCartImage}
        component="img"
        src={emptyCartImage}
      />
      <Typography className={classes.EmptyCartMessage}>{emptyCartMessages[0]}</Typography>
      <Typography className={classes.EmptyCartMessage}>{emptyCartMessages[1]}</Typography>
      <Link
        component={RouterLink}
        to="/shop"
        className={classes.LinkToShop}
      >
        {emptyCartMessages[2]}
      </Link>
    </Box>
  );
};
