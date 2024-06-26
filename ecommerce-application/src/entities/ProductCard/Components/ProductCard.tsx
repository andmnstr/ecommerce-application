import { AddShoppingCart } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addProductToCart, getApiRoot } from '../../../shared';
import { getProductCardData } from '../Api';
import type { IProductCard } from '../Lib/type';
import classes from './ProductCard.module.scss';

export const ProductCard: React.FC<IProductCard> = props => {
  const { id, image, name, description, price, oldPrice, product, category, productLink, size, isInCart, sku } = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(isInCart);
  const buttonText = isDisabled ? 'In cart' : 'Add to cart';

  const onClick = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    if (!isLoading) {
      try {
        setIsLoading(true);
        await addProductToCart(sku);
        setIsLoading(false);
        setIsDisabled(true);
      } catch (error) {
        setIsLoading(false);
        setIsDisabled(false);
      }
    }
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
        localStorage.setItem('Product sku', sku);
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
            variant="contained"
            disabled={isDisabled}
            onClick={onClick}
          >
            {isLoading && (
              <CircularProgress
                size={24}
                color="secondary"
              />
            )}
            {!isLoading && <Typography>{buttonText}</Typography>}
            {!isDisabled && !isLoading && <AddShoppingCart fontSize="small" />}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
