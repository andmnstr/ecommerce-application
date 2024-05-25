import { Skeleton } from '@mui/material';
import type React from 'react';

import { AttributeSelector } from '../../AttributeSelector';
import { CartManagement } from '../../CartManagement';
import { ProductPrice } from '../../ProductPrice';
import styles from './InfoSection.module.scss';

interface IProductInfoProps {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  colors: string[];
  sizes: string[];
}

export const ProductInfo: React.FC<IProductInfoProps> = props => {
  const { name, description, price, discountPrice, colors, sizes } = props;

  return (
    <aside className={styles.info_section}>
      {name ? (
        <div className={styles.product_name}>{name}</div>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          className={styles.product_name}
        />
      )}
      <ProductPrice
        price={price / 100}
        discounted={discountPrice / 100}
      />
      <AttributeSelector
        type="colors"
        values={colors}
      />
      <AttributeSelector
        type="sizes"
        values={sizes}
      />
      {description ? (
        <div className={styles.product_description}>{description}</div>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          className={styles.product_description}
        />
      )}
      <CartManagement />
    </aside>
  );
};
