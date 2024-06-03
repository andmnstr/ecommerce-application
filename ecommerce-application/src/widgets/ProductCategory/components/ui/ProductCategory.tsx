import { Card, Divider, List, ListItem } from '@mui/material';
import type React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCategory.module.scss';

interface IProductCategoryProps {
  category: string | undefined;
  subcategory: string[] | undefined;
  imageURL: string | undefined;
}

export const ProductCategory: React.FC<IProductCategoryProps> = props => {
  const { category, subcategory, imageURL } = props;
  const subcatArr: string[] = [];

  if (subcategory !== undefined && subcategory.length > 0) {
    subcategory.forEach(subcategoryItem => {
      subcatArr.push(subcategoryItem);
    });
  }

  const randomNum = (Math.random() * 10000).toFixed(0);

  return (
    <Card className={styles.category}>
      <div
        className={styles.category_card}
        style={{ backgroundImage: `url(${imageURL})` }}
      />
      <Link
        to={`/shop/${category}`}
        className={styles.category_name}
      >
        {category ?? ''}
      </Link>
      <Divider style={{ width: '90%', margin: 'auto' }} />
      <List>
        {subcatArr.map(item => {
          return (
            <ListItem key={item + randomNum}>
              <Link
                to={`/shop/${category}/${item}`}
                className={styles.subcategory_name}
                key={item + randomNum}
              >
                {item}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
