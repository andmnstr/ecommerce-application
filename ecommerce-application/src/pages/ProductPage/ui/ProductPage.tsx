import type React from 'react';

import { Header } from '../../../widgets/Header';
import { ProductSection } from '../../../widgets/ProductSection';

interface IProductPage {
  id: string;
}

export const ProductPage: React.FC<IProductPage> = ({ id }) => {
  return (
    <>
      <Header />
      <ProductSection id={id} />
    </>
  );
};
