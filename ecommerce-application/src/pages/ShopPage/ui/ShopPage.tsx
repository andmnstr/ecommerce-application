import type { ProductProjection } from '@commercetools/platform-sdk';
import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, Skeleton, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import CategoryImage1 from '../../../../public/images/ShopCategoryImage1.webp?url';
import CategoryImage2 from '../../../../public/images/ShopCategoryImage2.jpeg?url';
import CategoryImage3 from '../../../../public/images/ShopCategoryImage3.jpeg?url';
import CategoryImage4 from '../../../../public/images/ShopCategoryImage4.avif?url';
import { getApiRoot } from '../../../shared';
import { ProductGrid, ShopActionDrawer } from '../../../widgets';
import { Header } from '../../../widgets/Header';
import { ProductCategory } from '../../../widgets/ProductCategory';
import type { ISearchField } from '../../../widgets/ProductsGrid/Lib/types';
import type { IFilters, Sort } from '../../../widgets/ShopActionDrawer/Lib/types';
import { fetchCategories } from '../Api';
import { fetchProducts } from '../Api/fetchProducts';
import type { IProductCategories } from '../lib/types';
import classes from './ShopPage.module.scss';

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [action, setAction] = useState<'none' | 'filter' | 'search'>('none');
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<IProductCategories[]>();
  const [categoryVisible, setCategoryVisible] = useState(false);
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
    fetchProducts(getApiRoot(), filter, sort, search).then(response => {
      setProducts(response.products);
      setAction(response.action);
    });
  }, [filter, sort, search]);

  useEffect(() => {
    fetchCategories(getApiRoot()).then(response => {
      setCategories(response);
      setCategoryVisible(true);
    });
  }, []);

  const rootCategories = ['Women', 'Men', 'Footwear', 'Accessories'];
  const categoryImages = [CategoryImage1, CategoryImage2, CategoryImage3, CategoryImage4];

  return (
    <div>
      <Header />
      <div className={classes.category_section}>
        <Typography className={classes.category_heading}>Product Categories</Typography>
        <Skeleton
          className={classes.category_skeleton}
          style={categoryVisible ? { display: 'none' } : { display: 'flex' }}
        />
        <section
          className={classes.category_cards}
          style={!categoryVisible ? { display: 'none' } : { display: 'flex' }}
        >
          {categories?.map((category, index) => {
            return (
              <ProductCategory
                category={rootCategories[index]}
                subcategory={category.subcategory}
                imageURL={categoryImages[index]}
              />
            );
          })}
        </section>
      </div>
      <Divider className={classes.category_divider} />
      <Typography className={classes.category_heading}>All products</Typography>
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
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};
