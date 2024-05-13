import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import type React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import type { IRegistrationFields } from '../../lib/RegistrationFieldsInterface';
import { schema } from '../../lib/ValidationSchema';
import { AddressBox } from '../AddressBox/AddressBox';
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
    console.log({ data });
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

        <CustomInputText
          label="Date of Birth"
          fullWidth
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
        />
        <AddressBox
          title="Billing Address"
          checkboxLabel="Set as default billing address"
        />
      </Box>

      <SameAddressCheckbox />
      <SignupButton />
    </Box>
  );
};
