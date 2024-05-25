import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import type React from 'react';

import type { IProductCard } from '../Lib/type';
import classes from './ProductCard.module.scss';

export const ProductCard: React.FC<IProductCard> = props => {
  const { image, name, description, price, oldPrice } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        src={image}
        component="img"
        alt={name}
        title={name}
      />
      <CardContent>
        <Box className={classes.container}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.description}>{description}</Typography>
          <Box className={classes.priceContainer}>
            <Typography className={classes.actualPrice}>{price}</Typography>
            <Typography className={classes.oldPrice}>{oldPrice}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
