import type { ButtonProps } from '@mui/material/Button';
import type React from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';

export const UserProfileButton: React.FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <CustomButton
      variant="contained"
      size="large"
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};
