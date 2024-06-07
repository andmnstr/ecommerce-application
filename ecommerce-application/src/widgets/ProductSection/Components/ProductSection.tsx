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
  category: string;
  subcategory: string;
  id: string;
}

export const ProductSection: React.FC<IProductSectionProps> = props => {
  const { category, subcategory, id } = props;

  const [product, setProduct] = useState<ProductProjection>();
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [open, setOpen] = useState(false);

  // const location = window.location.pathname;
  // const id = location.substring(location.indexOf(':') + 1, location.length);

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
  const master = product?.masterVariant;
  const priceAttribute = master?.prices;
  const productAttributes = master?.attributes;
  const productNameData = product?.name;
  const productName = productNameData ? productNameData['ru-RU'] : '';
  const productDescription = product?.description !== undefined ? product.description['ru-RU'] : undefined;
  const productPrice = priceAttribute !== undefined ? priceAttribute[0]?.value?.centAmount : undefined;
  const productPriceDiscounted = priceAttribute !== undefined ? priceAttribute[0]?.value?.centAmount : undefined;
  const productImages = master?.images;
  let productSpec: string | undefined;
  const errorMessage = 'Requested product item was not found! Please, return back and try to choose another item.';
  const productAdditionInfo = { color: '', size: '', season: '' };

  if (productAttributes !== undefined) {
    const specAttribute: ISpecAttributeValue = productAttributes[1];
    productSpec = specAttribute.value;
  }

  if (product?.variants !== undefined && product.variants.length > 0) {
    product.variants.forEach(variant => {
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
  }

  if (master?.attributes !== undefined) {
    const prodAttributes = master.attributes;

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

  const capitalCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const capitalSubCategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);

  return (
    <section className={styles.section}>
      <BreadCrumbs
        category={capitalCategory}
        subcategory={capitalSubCategory}
        product={productName}
      />
      <Alert
        className={styles.product_data_error}
        severity="error"
        variant="filled"
        style={errorDisplay && !productNameData ? { display: 'flex' } : { display: 'none' }}
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
