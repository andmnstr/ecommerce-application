import type { ButtonProps } from '@mui/material/Button';
import type React from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import classes from '../UserProfile.module.scss';

export const UserProfileButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <CustomButton
      variant="contained"
      size="large"
      type="button"
      className={classes.Button}
    >
      {children}
    </CustomButton>
  );
};
