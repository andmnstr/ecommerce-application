import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import type React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { IRegistrationFields } from '../../lib/RegistrationFieldsInterface';
import { schema } from '../../lib/ValidationSchema';
import { AddressBox } from '../AddressBox/AddressBox';
import { DateInputWithController } from '../DateInputWithController/DateInputWithController';
import { InputWithController } from '../InputWithController/InputWithController';
import classes from '../RegistrationForm.module.scss';
import { SameAddressCheckbox } from '../SameAddressCheckbox/SameAddressCheckbox';
import { SignupButton } from '../SignupButton/SignupButton';

export const SubmitForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegistrationFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitForm: SubmitHandler<IRegistrationFields> = data => {
    console.log(data);
  };

  console.log(errors);

  return (
    <Box
      component="form"
      className={classes.form}
      onSubmit={handleSubmit(submitForm)}
    >
      <Stack
        direction="row"
        spacing={2}
      >
        <InputWithController
          name="firstName"
          control={control}
          label="First Name"
          helperText={errors.firstName?.message}
        />
        <InputWithController
          name="lastName"
          control={control}
          label="Last Name"
          helperText={errors.lastName?.message}
        />
        <DateInputWithController
          control={control}
          helperText={errors.dateOfBirth?.message}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
      >
        <InputWithController
          name="email"
          control={control}
          label="Email"
          helperText={errors.email?.message}
        />
        <InputWithController
          name="password"
          control={control}
          label="Password"
          helperText={errors.password?.message}
        />
      </Stack>

      <Box className={classes.address}>
        <AddressBox
          title="Shipping Address"
          checkboxLabel="Set as default shipping address"
          names={['shippingStreet', 'shippingCity']}
          control={control}
          helperTexts={[errors.shippingStreet?.message, errors.shippingCity?.message]}
        />
        <AddressBox
          title="Billing Address"
          checkboxLabel="Set as default billing address"
          names={['billingStreet', 'billingCity']}
          control={control}
          helperTexts={[errors.billingStreet?.message, errors.billingCity?.message]}
        />
      </Box>

      <SameAddressCheckbox />
      <SignupButton />
    </Box>
  );
};
