import type React from 'react';

import { ShopBanner, ShopCategorySlider, ShopReviewsSection, ShopStoriesSection } from '../../../widgets';
import { Header } from '../../../widgets/Header';

export const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <ShopBanner />
      <ShopCategorySlider />
      <ShopReviewsSection />
      <ShopStoriesSection />
    </>
  );
};
