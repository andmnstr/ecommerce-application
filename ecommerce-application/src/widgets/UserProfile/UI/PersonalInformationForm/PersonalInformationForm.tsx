import type { Customer } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, TextField } from '@mui/material';
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
import { FormSubmitMessages } from '../../lib/types/personalInformation.types';
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
  const [saveButton, setSaveButtonClass] = useState(classes.Invisible);
  const [message, setMessage] = useState('');

  const enableEditMode = (): void => {
    setIsDisabled(false);
    setEditButtonClass(classes.Invisible);
    setSaveButtonClass(classes.Button);
    setMessage('');
  };

  const submitForm: SubmitHandler<IPersonalInformationFields> = async formData => {
    const date = new Date(formData.dateOfBirth);
    const correctDateOfBirth = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    try {
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
                dateOfBirth: correctDateOfBirth,
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
      setSaveButtonClass(classes.Invisible);
      setMessage(FormSubmitMessages.Success);
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        if (error.status === 400) {
          setMessage(FormSubmitMessages.EmailError);
        } else {
          setMessage(FormSubmitMessages.OtherError);
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
        name="firstName"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message ?? ' '}
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
      {message && (
        <Alert
          severity={message === 'Your data has been succesfully updated.' ? 'success' : 'error'}
          variant="filled"
        >
          {message}
        </Alert>
      )}
    </Box>
  );
};
