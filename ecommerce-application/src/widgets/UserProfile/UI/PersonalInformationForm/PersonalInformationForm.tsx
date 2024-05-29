import type { Customer } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { getApiRoot } from '../../../../shared';
import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { dateView } from '../../../RegistrationForm/consts/RegistrationForm.consts';
import { personalInformationSchema } from '../../lib/personalInformationSchema';
import type { IPersonalInformationFields } from '../../lib/types/personalInformation.types';
import classes from '../UserProfile.module.scss';

interface IPersonalInformationFormProps {
  userInfo: Customer;
}

export const PersonalInformationForm: React.FC<IPersonalInformationFormProps> = ({ userInfo }) => {
  const { firstName, lastName, dateOfBirth, email, version } = userInfo;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPersonalInformationFields>({
    resolver: yupResolver(personalInformationSchema),
    mode: 'onChange',
    defaultValues: {
      firstName,
      lastName,
      email,
      dateOfBirth: dateOfBirth ? new Date(Date.parse(dateOfBirth)) : undefined,
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [editButton, setEditButtonClass] = useState(classes.Button);
  const [saveButton, setSavetButtonClass] = useState(classes.Invisible);

  const enableEditMode = (): void => {
    setIsDisabled(false);
    setEditButtonClass(classes.Invisible);
    setSavetButtonClass(classes.Button);
  };

  const submitForm: SubmitHandler<IPersonalInformationFields> = async formData => {
    const date = new Date(formData.dateOfBirth);
    const correstDateOfBirth = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    await getApiRoot()
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'setFirstName',
              firstName: formData.firstName,
            },
            {
              action: 'setLastName',
              lastName: formData.lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: correstDateOfBirth,
            },
            {
              action: 'changeEmail',
              email: formData.email,
            },
          ],
        },
      })
      .execute();

    setIsDisabled(true);
    setEditButtonClass(classes.Button);
    setSavetButtonClass(classes.Invisible);
  };

  return (
    <Box
      component="form"
      className={classes.Container}
      onSubmit={handleSubmit(submitForm)}
    >
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message ?? ' '}
              className={classes.Input}
              fullWidth
              disabled={isDisabled}
            />
          );
        }}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message ?? ' '}
              className={classes.Input}
              fullWidth
              disabled={isDisabled}
            />
          );
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => {
            return (
              <DatePicker
                {...field}
                label="Date of Birth"
                views={dateView}
                format="DD/MM/YYYY"
                value={dayjs(field.value)}
                disabled={isDisabled}
                className={classes.Input}
                slots={{
                  textField: TextField,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    autoComplete: 'false',
                    helperText: errors.dateOfBirth?.message ?? ' ',
                    error: !!errors.dateOfBirth,
                  },
                }}
              />
            );
          }}
        />
      </LocalizationProvider>
      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message ?? ' '}
              className={classes.Input}
              fullWidth
              disabled={isDisabled}
            />
          );
        }}
      />
      <CustomButton
        variant="contained"
        size="large"
        className={editButton}
        type="button"
        onClick={enableEditMode}
      >
        Edit
      </CustomButton>
      <CustomButton
        variant="contained"
        size="large"
        className={saveButton}
        type="submit"
      >
        Save
      </CustomButton>
    </Box>
  );
};
