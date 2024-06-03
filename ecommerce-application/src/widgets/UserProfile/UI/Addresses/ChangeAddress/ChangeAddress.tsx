import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { countries, getApiRoot } from '../../../../../shared';
import { CustomButton } from '../../../../../shared/UI/button/CustomButton';
import { FormSubmitMessages } from '../../../lib/types/personalInformation.types';
import type { IUserAddressesFields, IUserAddressesProps } from '../../../lib/types/userAddresses.types';
import { userAddressesSchema } from '../../../lib/userAddressesSchema';
import classes from '../../UserProfile.module.scss';
import { SelectWithController } from '../SelectWithController/SelectWithController';

export const ChangeAddress: React.FC<IUserAddressesProps> = ({
  address,
  version,
  isDefaultBillingAddress,
  isDefaultShippingAddress,
  onCancel,
}) => {
  const { id, streetName, postalCode, city, country } = address;
  const fullCountry = countries.filter((item: string[]) => {
    return item[1] === country;
  })[0][0];

  const [saveButton, setSaveButtonClass] = useState(classes.Button);
  const [message, setMessage] = useState('');
  const [defaultBilling, setDefaultBilling] = useState(isDefaultBillingAddress);
  const [defaultShipping, setDefaultShipping] = useState(isDefaultShippingAddress);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserAddressesFields>({
    resolver: yupResolver(userAddressesSchema),
    mode: 'onChange',
    defaultValues: {
      streetName,
      city,
      postalCode,
      fullCountry,
    },
  });

  const submitForm: SubmitHandler<IUserAddressesFields> = async formData => {
    try {
      const response = await getApiRoot()
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'changeAddress',
                addressId: id,
                address: {
                  streetName: formData.streetName,
                  postalCode: formData.postalCode,
                  city: formData.city,
                  country: countries.filter(item => {
                    return item[0] === formData.fullCountry;
                  })[0][1],
                },
              },
            ],
          },
        })
        .execute();

      const setDefaultActions: MyCustomerUpdateAction[] = [];
      if (defaultBilling && !isDefaultBillingAddress) {
        setDefaultActions.push({ action: 'setDefaultBillingAddress', addressId: id });
      }
      if (!defaultBilling && isDefaultBillingAddress) {
        setDefaultActions.push({ action: 'setDefaultBillingAddress' });
      }

      if (defaultShipping && !isDefaultShippingAddress) {
        setDefaultActions.push({ action: 'setDefaultShippingAddress', addressId: id });
      }

      if (!defaultShipping && isDefaultShippingAddress) {
        setDefaultActions.push({ action: 'setDefaultShippingAddress' });
      }

      if (setDefaultActions.length > 0) {
        await getApiRoot()
          .me()
          .post({
            body: {
              version: response.body.version,
              actions: setDefaultActions,
            },
          })
          .execute();
      }

      setSaveButtonClass(classes.Invisible);
      setMessage(FormSubmitMessages.Success);
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        setMessage(FormSubmitMessages.OtherError);
      }
    }
  };
  return (
    <Box
      component="form"
      className={classes.Container}
      onSubmit={handleSubmit(submitForm)}
    >
      <Typography variant="h6">Edit address</Typography>
      <Controller
        name="streetName"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Street"
              error={!!errors.streetName}
              helperText={errors.streetName?.message ?? ' '}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="City"
              error={!!errors.city}
              helperText={errors.city?.message ?? ' '}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="postalCode"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Postal code"
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message ?? ' '}
              fullWidth
            />
          );
        }}
      />
      <SelectWithController
        name="fullCountry"
        control={control}
        label="Country"
        error={!!errors.fullCountry}
        helperText={errors.fullCountry?.message}
        value={fullCountry}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={defaultShipping}
            onChange={event => {
              setDefaultShipping(event.target.checked);
            }}
          />
        }
        label="Set as default shipping address"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={defaultBilling}
            onChange={event => {
              setDefaultBilling(event.target.checked);
            }}
          />
        }
        label="Set as default billing address"
      />
      <CustomButton
        variant="contained"
        size="large"
        className={saveButton}
        type="submit"
      >
        Save
      </CustomButton>
      <CustomButton
        variant="contained"
        size="large"
        className={classes.Button}
        onClick={onCancel}
      >
        Back
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
