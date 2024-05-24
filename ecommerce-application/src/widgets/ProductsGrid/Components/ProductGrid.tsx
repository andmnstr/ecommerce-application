import type { ProductProjection } from '@commercetools/platform-sdk';
import { Grid } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { ProductCard } from '../../../entities';
import { getApiRoot } from '../../../shared/Api/apiRoot';
import { fetchProducts } from '../Api/fetchProducts';
import classes from './ProductGrid.module.scss';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  useEffect(() => {
    fetchProducts(getApiRoot()).then(response => {
      setProducts(response);
    });
  }, []);
  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
    >
      {products.map(product => {
        const productVariants = product.variants[0];
        const centsPerEuro = 100;
        let key = '';
        let name = '';
        let description = '';
        let image = '';
        let price = '';
        if (productVariants.images && productVariants.images.length) {
          image = productVariants.images[0].url;
        }
        key = product.id;
        name = product.name['ru-RU'];
        if (product.description) {
          description = product.description['ru-RU'];
        }
        if (productVariants.prices && productVariants.prices.length) {
          price = (productVariants.prices[0].value.centAmount / centsPerEuro).toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
          });
        }
        return (
          <Grid
            item
            key={key}
            className={classes.gridItem}
          >
            <ProductCard
              key={key}
              name={name}
              image={image}
              description={description}
              price={price}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
