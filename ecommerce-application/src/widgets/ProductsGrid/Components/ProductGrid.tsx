import { Grid } from '@mui/material';
import type React from 'react';

import { ProductCard } from '../../../entities';
import { isColorValue } from '../Lib/predicates';
import type { IProducts } from '../Lib/types';
import classes from './ProductGrid.module.scss';

export const ProductGrid: React.FC<IProducts> = ({ products, action }) => {
  const centsPerEuro = 100;
  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
    >
      {products.map(product => {
        const colors: string[] = [];
        let { variants } = product;
        if (action === 'filter') {
          variants = product.variants.filter(variant => {
            return variant.isMatchingVariant;
          });
        }
        return variants.map(variant => {
          if (variant.attributes) {
            const color = variant.attributes.find(item => {
              return item.name === 'color';
            });
            if (color && isColorValue(color.value) && !colors.includes(color.value['ru-RU'])) {
              colors.push(color.value['ru-RU']);
              let id = '';
              let key = '';
              let name = '';
              let description = '';
              let image = '';
              let price = '';
              let category = '';
              let productLink = '';
              let oldPrice = '';
              if (variant.images && variant.images.length) {
                image = variant.images[0].url;
              }
              id = product.id;
              key = `${product.id}-${variant.id}`;
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
              if (variant.prices && variant.prices.length) {
                if (variant.prices[0].discounted) {
                  oldPrice = (variant.prices[0].value.centAmount / centsPerEuro).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  });
                  price = (variant.prices[0].discounted.value.centAmount / centsPerEuro).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  });
                } else {
                  price = (variant.prices[0].value.centAmount / centsPerEuro).toLocaleString('en-US', {
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
                    id={id}
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
            }
          }
          return null;
        });
      })}
    </Grid>
  );
};
