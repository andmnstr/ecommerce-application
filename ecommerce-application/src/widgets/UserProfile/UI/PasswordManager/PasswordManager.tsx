import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import type React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { getApiRoot } from '../../../../shared';
import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { passwordManagerSchema } from '../../lib/passwordManagerSchema';
import type { IPasswordManagerFields } from '../../lib/types/passwordManager.types';
import classes from '../UserProfile.module.scss';

interface IPasswordManagerProps {
  version: number;
}

export const PasswordManager: React.FC<IPasswordManagerProps> = ({ version }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IPasswordManagerFields>({
    resolver: yupResolver(passwordManagerSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const submitForm: SubmitHandler<IPasswordManagerFields> = async formData => {
    await getApiRoot()
      .me()
      .password()
      .post({
        body: {
          version,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      })
      .execute();

    reset();
  };

  return (
    <Box
      component="form"
      className={classes.Container}
      onSubmit={handleSubmit(submitForm)}
    >
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Current password"
              autoComplete="false"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message ?? ' '}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="New password"
              autoComplete="false"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message ?? ' '}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="confirmNewPassword"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Confirm new password"
              autoComplete="false"
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message ?? ' '}
              fullWidth
            />
          );
        }}
      />
      <CustomButton
        variant="contained"
        size="large"
        className={classes.Button}
        type="submit"
      >
        Save
      </CustomButton>
      <CustomButton
        variant="contained"
        size="large"
        className={classes.Button}
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Cancel
      </CustomButton>
    </Box>
  );
};
