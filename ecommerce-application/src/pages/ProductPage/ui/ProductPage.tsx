import type React from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../../widgets/Header';
import { ProductSection } from '../../../widgets/ProductSection';

export const ProductPage: React.FC = () => {
  const { category, subcategory, id } = useParams();
  console.log(category, subcategory, id);
  return (
    <>
      <Header />
      <ProductSection
        category={category || ''}
        subcategory={subcategory || ''}
        id={id || ''}
      />
    </>
  );
};
