import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import { schema } from '../Lib/schema';
import type { ILoginFormFields } from '../Lib/type';
import classes from './LoginForm.module.scss';
import { PasswordEndAdornment } from './PasswordEndAdornment';

export const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitForm: SubmitHandler<ILoginFormFields> = data => {
    console.log({ data });
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
        <Controller
          name="email"
          control={control}
          // eslint-disable-next-line implicit-arrow-linebreak
          render={({ field }) => (
            <CustomInputText
              onChange={field.onChange}
              className={classes.loginInput}
              type="text"
              label="Enter your e-mail"
              fullWidth
              autoComplete="false"
            />
          )}
        />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <Controller
          name="password"
          control={control}
          // eslint-disable-next-line implicit-arrow-linebreak
          render={({ field }) => (
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
          )}
        />
        <p>{errors.password?.message}</p>
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
