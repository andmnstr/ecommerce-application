import type React from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import classes from '../RegistrationForm.module.scss';

export const SignupButton: React.FC = () => {
  return (
    <CustomButton
      variant="contained"
      size="large"
      className={classes.button}
    >
      Signup
    </CustomButton>
  );
};
