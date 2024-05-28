import type React from 'react';

import { ShopBanner, ShopCategorySlider, ShopStoriesSection } from '../../../widgets';
import { Header } from '../../../widgets/Header';

export const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <ShopBanner />
      <ShopCategorySlider />
      <ShopStoriesSection />
    </>
  );
};
