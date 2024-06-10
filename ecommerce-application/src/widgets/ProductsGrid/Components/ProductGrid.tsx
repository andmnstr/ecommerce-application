import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { ProductCard } from '../../../entities';
import { isLocalizedString } from '../Lib/predicates';
import type { IProducts, IVariants } from '../Lib/types';
import classes from './ProductGrid.module.scss';
import { ProductSearch } from './ProductSearch/ProductSearch';

export const ProductGrid: React.FC<IProducts> = ({ products, action, sort, onSearch, toStartPage }) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [productsOnPage, setProductsOnPage] = useState<IVariants[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsQuantityPerPage = 30;
  const discountPercent = 20;
  const centsPerEuro = 100;
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
  useEffect(() => {
    const newPageCount = Math.ceil(variants.length / productsQuantityPerPage);
    if (pageCount !== newPageCount) {
      setPageCount(newPageCount);
    }

    const newProductsOnPage = variants.slice(
      (currentPage - 1) * productsQuantityPerPage,
      currentPage * productsQuantityPerPage
    );
    if (JSON.stringify(productsOnPage) !== JSON.stringify(newProductsOnPage)) {
      setProductsOnPage(newProductsOnPage);
    }
  }, [currentPage, variants, pageCount, productsOnPage, productsQuantityPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [toStartPage]);
  if (action === 'filter') {
    variants = variants.filter(variant => {
      return variant.variant.isMatchingVariant;
    });
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setCurrentPage(value);
  };
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
    <Box className={classes.catalogContainer}>
      <Box className={classes.searchContainer}>
        <ProductSearch onSubmit={onSearch} />
      </Box>
      {productsOnPage && productsOnPage.length ? (
        <Box className={classes.gridContainer}>
          <Grid
            container
            spacing={2}
            className={classes.grid}
          >
            {productsOnPage.map(currentVariant => {
              const { variant, productId, productDescription, productKey, productCategories, productName } =
                currentVariant;
              let id = '';
              let key = '';
              let name = '';
              let description = '';
              let image = '';
              let price = '';
              let category = '';
              let productLink = '';
              let oldPrice = '';
              let size = '';
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
                oldPrice = (variant.prices[0].value.centAmount / centsPerEuro).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'EUR',
                });
                if (variant.prices[0].discounted) {
                  price = (variant.prices[0].discounted.value.centAmount / centsPerEuro).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  });
                } else {
                  const oldPriceNumber = +oldPrice.slice(1);
                  price = `€${(oldPriceNumber - oldPriceNumber * (discountPercent / 100)).toFixed(2)}`;
                }
              }
              if (variant.attributes) {
                const variantSize = variant.attributes.find(item => {
                  return item.name === 'size';
                });
                if (variantSize && isLocalizedString(variantSize.value)) {
                  size = `Size: ${variantSize.value['ru-RU']}`;
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
                    isInCart={false}
                    size={size}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Stack
            spacing={2}
            className={classes.pagination}
          >
            <Pagination
              className={classes.paginationElement}
              count={pageCount}
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={handleChange}
              sx={{
                '& .Mui-selected': {
                  color: '#222',
                },
              }}
            />
          </Stack>
        </Box>
      ) : (
        <Box className={classes.noMatchTextContainer}>
          <Typography className={classes.noMatchText}>Sorry, no matches found</Typography>
        </Box>
      )}
    </Box>
  );
};
