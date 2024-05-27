import type { ProductProjection } from '@commercetools/platform-sdk';
import { Alert } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../shared';
import { getCurrentProductData } from '../Api/getCurrentProductData';
import { BreadCrumbs } from './BreadCrumbs';
import { ImagesSection } from './ImagesSection';
import { ProductInfo } from './ProductInfo';
import { ProductModalWindow } from './ProductModalWindow';
import styles from './ProductSection.module.scss';

interface IProductAttributeValue {
  value: {
    'ru-RU': string;
    key: string;
    label: string;
  };
}

interface ISpecAttributeValue {
  name: string;
  value: string;
}

interface IProductSectionProps {
  id: string;
}

export const ProductSection: React.FC<IProductSectionProps> = ({ id }) => {
  const [product, setProduct] = useState<ProductProjection>();
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    getCurrentProductData(getApiRoot(), id)
      .then(response => {
        setProduct(response);
      })
      .catch(error => {
        if (error instanceof Error) {
          setErrorDisplay(true);
          throw new Error(error.message);
        }
      });
  }, [id, errorDisplay]);

  const productColors: string[] = [];
  const productSizes: string[] = [];
  const priceAttribute = product?.masterVariant.prices;
  const productAttributes = product?.masterVariant.attributes;
  const productName = product?.name['ru-RU'];
  const productDescription = product?.description !== undefined ? product.description['ru-RU'] : undefined;
  const productPrice = priceAttribute !== undefined ? priceAttribute[0].value.centAmount : undefined;
  const productPriceDiscounted = priceAttribute !== undefined ? priceAttribute[0].value.centAmount : undefined;
  const productImages = product?.masterVariant.images;
  let productSpec: string | undefined;
  const errorMessage = 'Requested product item was not found! Please, return back and try to choose another item.';
  const productAdditionInfo = { color: '', size: '', season: '' };

  if (productAttributes !== undefined) {
    const specAttribute: ISpecAttributeValue = productAttributes[1];
    productSpec = specAttribute.value;
  }

  product?.variants.forEach(variant => {
    if (variant.attributes !== undefined) {
      variant.attributes.map(attribute => {
        if (attribute.name === 'color') {
          const colorAttribute: IProductAttributeValue = attribute;
          productColors.push(colorAttribute.value['ru-RU']);
        }

        if (attribute.name === 'size') {
          const colorAttribute: IProductAttributeValue = attribute;
          productSizes.push(colorAttribute.value['ru-RU']);
        }
        return null;
      });
    }
    return null;
  });

  if (product?.masterVariant.attributes !== undefined) {
    const prodAttributes = product.masterVariant.attributes;

    prodAttributes.map(attribute => {
      if (attribute.name === 'color') {
        const colorAttribute: IProductAttributeValue = attribute;
        productAdditionInfo.color = colorAttribute.value['ru-RU'];
      }
      if (attribute.name === 'size') {
        const sizeAttribute: IProductAttributeValue = attribute;
        productAdditionInfo.size = sizeAttribute.value['ru-RU'];
      }
      if (attribute.name === 'season') {
        const seasonAttribute: IProductAttributeValue = attribute;
        productAdditionInfo.season = seasonAttribute.value.label;
      }
      return null;
    });
  }

  return (
    <section className={styles.section}>
      <BreadCrumbs />
      <Alert
        className={styles.product_data_error}
        severity="error"
        variant="filled"
        style={errorDisplay ? { display: 'flex' } : { display: 'none' }}
      >
        {errorMessage}
      </Alert>
      <article className={styles.section__product_wrapper}>
        <ImagesSection
          images={productImages}
          productProperties={productAdditionInfo}
          additionInfo={productSpec}
          modalOpen={handleClickOpen}
        />
        <ProductInfo
          name={productName}
          description={productDescription}
          price={productPrice}
          discountPrice={productPriceDiscounted}
          colors={productColors}
          sizes={productSizes}
        />
      </article>
      <ProductModalWindow
        images={productImages}
        open={open}
        close={handleClose}
      />
    </section>
  );
};
