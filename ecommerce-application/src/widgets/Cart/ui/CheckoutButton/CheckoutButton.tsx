import type React from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';

export const CheckoutButton: React.FC = () => {
  return (
    <CustomButton
      variant="contained"
      size="large"
      type="button"
    >
      Checkout
    </CustomButton>
  );
};
