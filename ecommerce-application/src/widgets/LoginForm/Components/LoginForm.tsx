import { Box, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import classes from './LoginForm.module.scss';
import { PasswordEndAdornment } from './PasswordEndAdornment';

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
      autoComplete="false"
    >
      <div className={classes.loginTitleAndDescription}>
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
              <PasswordEndAdornment
                onClick={showOrHidePassword}
                showPassword={values.showPassword}
              />
            ),
          }}
        />
      </div>
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
