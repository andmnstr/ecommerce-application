import { Grid } from '@mui/material';
import type React from 'react';

import { ProductCard } from '../../../entities';
import { isColorValue } from '../Lib/predicates';
import type { IProducts, IVariants } from '../Lib/types';
import classes from './ProductGrid.module.scss';

export const ProductGrid: React.FC<IProducts> = ({ products, action, sort }) => {
  const centsPerEuro = 100;
  const colors: string[] = [];
  let variants = products.reduce((acc: IVariants[], product) => {
    product.variants.map(variant => {
      if (product.description && product.key) {
        const productVariant = {
          variant,
          productId: product.id,
          productDescription: product.description,
          productKey: product.key,
          productCategories: product.categories,
          productName: product.name,
        };
        acc.push(productVariant);
      }
      return variant;
    });
    return acc;
  }, []);
  if (action === 'filter') {
    variants = variants.filter(variant => {
      return variant.variant.isMatchingVariant;
    });
  }
  if (sort === 'ascending' || sort === 'descending') {
    variants.sort((a, b) => {
      if (a.variant.prices && b.variant.prices) {
        return sort === 'ascending'
          ? a.variant.prices[0].value.centAmount - b.variant.prices[0].value.centAmount
          : b.variant.prices[0].value.centAmount - a.variant.prices[0].value.centAmount;
      }
      return 0;
    });
  }
  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
    >
      {variants.map(currentVariant => {
        const { variant, productId, productDescription, productKey, productCategories, productName } = currentVariant;
        if (variant.attributes) {
          const color = variant.attributes.find(item => {
            return item.name === 'color';
          });
          if (
            color &&
            isColorValue(color.value) &&
            !colors.includes(JSON.stringify({ id: productId, color: color.value['ru-RU'] }))
          ) {
            colors.push(JSON.stringify({ id: productId, color: color.value['ru-RU'] }));
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
            id = productId;
            key = `${productId}-${variant.id}`;
            name = productName['ru-RU'];
            description = productDescription['ru-RU'];
            if (productKey) {
              productLink = productKey;
            }
            if (productCategories[0]) {
              category = productCategories[0].id;
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
      })}
    </Grid>
  );
};
