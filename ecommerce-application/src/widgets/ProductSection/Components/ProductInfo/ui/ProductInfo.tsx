import { Divider, Skeleton } from '@mui/material';
import type React from 'react';

import { AttributeSelector } from '../../AttributeSelector';
import { CartManagement } from '../../CartManagement';
import { ProductPrice } from '../../ProductPrice';
import styles from './ProductInfo.module.scss';

interface IProductInfoProps {
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  discountPrice: number | undefined;
  colors: string[];
  sizes: string[];
}

export const ProductInfo: React.FC<IProductInfoProps> = props => {
  const { name, description, price, discountPrice, colors, sizes } = props;

  const productPrice = price ? price / 100 : undefined;
  const productPriceDiscounted = discountPrice ? discountPrice * 0.008 : undefined;

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
        price={productPrice?.toFixed(2)}
        discounted={productPriceDiscounted?.toFixed(2)}
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
      <Divider aria-hidden="true" />
      <CartManagement />
    </aside>
  );
};
