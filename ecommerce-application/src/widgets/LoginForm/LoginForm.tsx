import { Box } from '@mui/material';
import type React from 'react';

import { CustomButton } from '../../shared/UI/button/CustomButton';
import CustomInputText from '../../shared/UI/CustomInputText/CustomInputText';
import FormCheckbox from '../../shared/UI/FormCheckbox/FormCheckbox';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, ...props }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      {...props}
    >
      <CustomInputText
        type="email"
        label="Enter your e-mail"
      />
      <CustomInputText label="Enter password" />
      <FormCheckbox
        label="Remember Me"
        // style={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
      />
      <CustomButton
        type="submit"
        variant="contained"
        fullWidth
      >
        Log in
      </CustomButton>
    </Box>
  );
};
