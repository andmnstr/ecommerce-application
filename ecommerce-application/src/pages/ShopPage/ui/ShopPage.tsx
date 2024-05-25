import type React from 'react';

import { ProductGrid } from '../../../widgets';
import { Header } from '../../../widgets/Header';

export const ShopPage: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductGrid />
    </div>
  );
};
