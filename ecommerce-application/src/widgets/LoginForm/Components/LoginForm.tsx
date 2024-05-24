import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { authorizeCustomer, setApiRoot } from '../../../shared';
import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import { ErrorMessages } from '../Lib/errorMessages';
import { schema } from '../Lib/schema';
import type { ILoginFormFields } from '../Lib/type';
import classes from './LoginForm.module.scss';
import { PasswordEndAdornment } from './PasswordEndAdornment';

export const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<ILoginFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [className, setClassName] = useState(classes.invisible);
  const [errorMessage, setErrorMessage] = useState('');
  const showError = (message: string): void => {
    setClassName(classes.visible);
    setErrorMessage(message);
  };
  const hideError = (): void => {
    setClassName(classes.invisible);
  };

  const navigate = useNavigate();

  const submitForm: SubmitHandler<ILoginFormFields> = async () => {
    const email = getValues('email');
    const password = getValues('password');
    const authorizationResponse = await authorizeCustomer({ email, password });
    if (typeof authorizationResponse === 'number') {
      const message =
        authorizationResponse === 400 ? ErrorMessages.WrongLoginOrPasswordError : ErrorMessages.OtherError;
      showError(message);
    } else if (authorizationResponse instanceof ByProjectKeyRequestBuilder) {
      navigate('/');
      hideError();
      setApiRoot(authorizationResponse);
    }
  };

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
      onSubmit={handleSubmit(submitForm)}
    >
      <div className={classes.loginTitleAndDescription}>
        <Typography className={classes.loginTitle}>Welcome</Typography>
        <Typography className={classes.loginDescription}>Please login here</Typography>
      </div>
      <div>
        <Alert
          severity="error"
          variant="filled"
          className={className}
        >
          {errorMessage}
        </Alert>
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <CustomInputText
                onChange={field.onChange}
                className={classes.loginInput}
                type="text"
                label="Enter your e-mail"
                fullWidth
                autoComplete="false"
              />
            );
          }}
        />
        <p className={classes.errorMessage}>{errors.email?.message}</p>
      </div>
      <div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <CustomInputText
                onChange={field.onChange}
                className={classes.loginInput}
                type={values.showPassword ? 'text' : 'password'}
                label="Enter password"
                fullWidth
                autoComplete="false"
                InputProps={{
                  endAdornment: (
                    <PasswordEndAdornment
                      onClick={showOrHidePassword}
                      showPassword={values.showPassword}
                    />
                  ),
                }}
              />
            );
          }}
        />
        <p className={classes.errorMessage}>{errors.password?.message}</p>
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
