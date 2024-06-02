import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, TextField } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getApiRoot, TOKEN_NAME } from '../../../../shared';
import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { passwordManagerSchema } from '../../lib/passwordManagerSchema';
import type { IPasswordManagerFields } from '../../lib/types/passwordManager.types';
import classes from '../UserProfile.module.scss';
import { SuccessUpdateModal } from './SuccessUpdateModal/SuccessUpdateModal';

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

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const toLoginPage = (): void => {
    localStorage.removeItem(TOKEN_NAME);
    handleClose();
    navigate('/login');
  };

  const [message, setMessage] = useState('');

  const submitForm: SubmitHandler<IPasswordManagerFields> = async formData => {
    try {
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
      setMessage('');
      handleOpen();
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        if (error.message) {
          setMessage(error.message);
        } else {
          setMessage('Something went wrong. Please try again later.');
        }
      }
    }
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
          setMessage('');
        }}
      >
        Cancel
      </CustomButton>
      <SuccessUpdateModal
        open={open}
        onClick={toLoginPage}
      />
      {message && (
        <Alert
          severity="error"
          variant="filled"
        >
          {message}
        </Alert>
      )}
    </Box>
  );
};
