import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '../../shared/UI/button/CustomButton';
import CustomInputText from '../../shared/UI/CustomInputText/CustomInputText';
import FormCheckbox from '../../shared/UI/FormCheckbox/FormCheckbox';
import classes from './LoginForm.module.scss';

export const LoginForm: React.FC = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const showOrHidePassword = (): void => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <Box
      className={classes.loginForm}
      component="form"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div>
        <Typography className={classes.loginTitle}>Welcome</Typography>
        <Typography className={classes.loginDescription}>Please login here</Typography>
      </div>
      <div>
        <CustomInputText
          className={classes.loginInput}
          type="e-mail"
          label="Enter your e-mail"
          fullWidth
        />
      </div>
      <div>
        <CustomInputText
          className={classes.loginInput}
          type={values.showPassword ? 'text' : 'password'}
          label="Enter password"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showOrHidePassword}>
                  {values.showPassword ? (
                    <VisibilityOff style={{ color: '#131118' }} />
                  ) : (
                    <Visibility style={{ color: '#131118' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <FormCheckbox
        className={classes.loginCheckbox}
        label="Remember Me"
      />
      <CustomButton
        className={classes.loginButton}
        type="submit"
        variant="contained"
        fullWidth
      >
        Login
      </CustomButton>
    </Box>
  );
};
