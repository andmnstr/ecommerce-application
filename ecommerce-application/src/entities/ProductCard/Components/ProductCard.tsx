import { AddShoppingCart } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { getApiRoot } from '../../../shared';
import { getProductCardData } from '../Api';
import type { IProductCard } from '../Lib/type';
import classes from './ProductCard.module.scss';

export const ProductCard: React.FC<IProductCard> = props => {
  const { id, image, name, description, price, oldPrice, product, category, productLink, size, isInCart } = props;
  const navigate = useNavigate();
  const buttonText = isInCart ? 'In cart' : 'Add to cart';

  const onClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <Card
      className={classes.card}
      data-product={product}
      data-category={category}
      data-product-link={productLink}
      onClick={async () => {
        const { categoryName, subcategoryName } = await getProductCardData(
          getApiRoot(),
          product,
          category,
          productLink
        );
        navigate(`/shop/${categoryName}/${subcategoryName}/${id}`);
      }}
    >
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
          <Typography className={classes.size}>{size}</Typography>
          <Box className={classes.priceContainer}>
            <Typography className={classes.actualPrice}>{price}</Typography>
            <Typography className={classes.oldPrice}>{oldPrice}</Typography>
          </Box>
          <Button
            className={classes.button}
            variant="outlined"
            disabled={isInCart}
            onClick={onClick}
          >
            {buttonText}
            {!isInCart && <AddShoppingCart />}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
