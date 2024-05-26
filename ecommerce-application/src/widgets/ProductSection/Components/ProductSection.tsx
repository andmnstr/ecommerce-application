import type { ProductProjection } from '@commercetools/platform-sdk';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../shared';
import { getCurrentProductData } from '../Api/getCurrentProductData';
import { BreadCrumbs } from './BreadCrumbs';
import { ImagesSection } from './ImagesSection';
import { ProductInfo } from './ProductInfo';
import styles from './ProductSection.module.scss';

interface IProductAttributeValue {
  name: string;
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

export const ProductSection: React.FC<string> = id => {
  const [product, setProduct] = useState<ProductProjection>();

  useEffect(() => {
    getCurrentProductData(getApiRoot(), id).then(response => {
      setProduct(response);
    });
  }, [id]);

  const productColors: string[] = [];
  const productSizes: string[] = [];
  const productProperties: string[] = [];
  const priceAttribute = product?.masterVariant.prices;
  const productAttributes = product?.masterVariant.attributes;
  const productName = product?.name['ru-RU'];
  const productDescription = product?.description !== undefined ? product.description['ru-RU'] : undefined;
  const productPrice = priceAttribute !== undefined ? priceAttribute[0].value.centAmount : undefined;
  const productPriceDiscounted = priceAttribute !== undefined ? priceAttribute[0].value.centAmount : undefined;
  const productImages = product?.masterVariant.images;
  let productSpec: string | undefined;

  if (productAttributes !== undefined) {
    const specAttribute: ISpecAttributeValue = productAttributes[1];
    productSpec = specAttribute.value;
  }

  product?.variants.forEach(variant => {
    if (variant.attributes !== undefined) {
      const size: IProductAttributeValue = variant.attributes[1];
      const color: IProductAttributeValue = variant.attributes[2];

      productSizes.push(size.value['ru-RU']);
      productColors.push(color.value['ru-RU']);
    }
  });

  if (product?.masterVariant.attributes !== undefined) {
    const prodAttributes = product.masterVariant.attributes;
    const seasonAttrubute: IProductAttributeValue = prodAttributes[2];
    const sizeAttrubute: IProductAttributeValue = prodAttributes[3];
    const colorAttrubute: IProductAttributeValue = prodAttributes[4];

    productProperties.push(colorAttrubute.value['ru-RU']);
    productProperties.push(sizeAttrubute.value['ru-RU']);
    productProperties.push(seasonAttrubute.value.label);
  }

  console.log(product);

  return (
    <section className={styles.section}>
      <BreadCrumbs />
      <article className={styles.section__product_wrapper}>
        <ImagesSection
          images={productImages}
          productProperties={productProperties}
          additionInfo={productSpec}
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
    </section>
  );
};
