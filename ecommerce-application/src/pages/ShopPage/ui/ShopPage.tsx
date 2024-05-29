import type { ProductProjection } from '@commercetools/platform-sdk';
import { ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../shared';
import { ProductGrid, ShopActionDrawer } from '../../../widgets';
import { Header } from '../../../widgets/Header';
import type { IFilters, Sort } from '../../../widgets/ShopActionDrawer/Lib/types';
import { fetchProducts } from '../Api/fetchProducts';
import classes from './ShopPage.module.scss';

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [action, setAction] = useState<'none' | 'filter' | 'search'>('none');
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<IFilters>({
    colors: [],
    categories: [],
    prices: [],
  });
  const [sort, setSort] = useState<Sort>();
  const toggleDrawer = (newOpen: boolean) => {
    return () => {
      setOpen(newOpen);
    };
  };
  const setActionValues = (newFilter: IFilters, newSort: Sort): void => {
    setFilter(newFilter);
    setOpen(false);
    setSort(newSort);
  };
  useEffect(() => {
    fetchProducts(getApiRoot(), filter, sort).then(response => {
      setProducts(response.products);
      setAction(response.action);
    });
  }, [filter, sort]);
  return (
    <div>
      <Header />
      <div className={classes.productsContainer}>
        <Button
          className={classes.drawerButton}
          onClick={toggleDrawer(true)}
        >
          <ArrowForward className={classes.arrow} />
        </Button>
        <ShopActionDrawer
          open={open}
          onClose={toggleDrawer(false)}
          onClick={setActionValues}
        />
        <ProductGrid
          products={products}
          action={action}
          sort={sort}
        />
      </div>
    </div>
  );
};
