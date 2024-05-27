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
        const productVariants = product.masterVariant;
        const centsPerEuro = 100;
        let key = '';
        let name = '';
        let description = '';
        let image = '';
        let price = '';
        let category = '';
        let productLink = '';
        let oldPrice = '';
        if (productVariants.images && productVariants.images.length) {
          image = productVariants.images[0].url;
        }
        key = product.id;
        name = product.name['ru-RU'];
        if (product.description) {
          description = product.description['ru-RU'];
        }
        if (product.key) {
          productLink = product.key;
        }
        if (product.categories[0]) {
          category = product.categories[0].id;
        }
        if (productVariants.prices && productVariants.prices.length) {
          if (productVariants.prices[0].discounted) {
            oldPrice = (productVariants.prices[0].value.centAmount / centsPerEuro).toLocaleString('en-US', {
              style: 'currency',
              currency: 'EUR',
            });
            price = (productVariants.prices[0].discounted.value.centAmount / centsPerEuro).toLocaleString('en-US', {
              style: 'currency',
              currency: 'EUR',
            });
          } else {
            price = (productVariants.prices[0].value.centAmount / centsPerEuro).toLocaleString('en-US', {
              style: 'currency',
              currency: 'EUR',
            });
          }
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
              product={key}
              category={category}
              productLink={productLink}
              oldPrice={oldPrice}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
