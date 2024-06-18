import type { ProductProjection } from '@commercetools/platform-sdk';
import { ArrowForward } from '@mui/icons-material';
import { Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { getApiRoot } from '../../../shared';
import { ProductGrid, ShopActionDrawer } from '../../../widgets';
import { Header } from '../../../widgets/Header';
import type { ISearchField } from '../../../widgets/ProductsGrid/Lib/types';
import type { IFilters, Sort } from '../../../widgets/ShopActionDrawer/Lib/types';
import { fetchWomenDresses } from '../Api';
import styles from './WomenDressesPage.module.scss';

export const WomenDressesPage: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [action, setAction] = useState<'none' | 'filter' | 'search'>('none');
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<IFilters>({
    colors: [],
    categories: [],
    prices: [],
  });
  const [sort, setSort] = useState<Sort>();
  const [search, setSearch] = useState<string>();
  const toggleDrawer = (newOpen: boolean) => {
    return () => {
      setOpen(newOpen);
    };
  };
  const handleSearch: SubmitHandler<ISearchField> = newSearch => {
    setSearch(newSearch.search);
  };
  const setActionValues = (newFilter: IFilters, newSort: Sort): void => {
    setFilter(newFilter);
    setOpen(false);
    setSort(newSort);
  };
  useEffect(() => {
    fetchWomenDresses(getApiRoot(), filter, sort, search).then(response => {
      setProducts(response.products);
      setAction(response.action);
    });
  }, [filter, sort, search]);

  return (
    <>
      <Header />
      <Breadcrumbs
        aria-label="breadcrumb"
        className={styles.breadcrumbs}
      >
        <Link
          color="inherit"
          to="/shop"
          className={styles.link}
        >
          Shop
        </Link>
        <Link
          color="inherit"
          to="/shop/women"
          className={styles.link}
        >
          Women
        </Link>
        <Typography
          color="text.primary"
          className={styles.link}
        >
          Dresses
        </Typography>
      </Breadcrumbs>
      <Divider className={styles.divider} />
      <div className={styles.productsContainer}>
        <Button
          className={styles.drawerButton}
          onClick={toggleDrawer(true)}
        >
          <ArrowForward className={styles.arrow} />
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
          onSearch={handleSearch}
          toStartPage={false}
        />
      </div>
    </>
  );
};
