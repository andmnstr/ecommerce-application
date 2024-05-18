import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, Stack } from '@mui/material';
import type React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { billingAddressInputNames, shippingAddressInputNames } from '../../consts/RegistrationForm.consts';
import type { IRegistrationFields } from '../../lib/types/RegistrationFields';
import { schema } from '../../lib/validationSchema';
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

  return (
    <FormControl>
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
            names={shippingAddressInputNames}
            control={control}
            helperTexts={[
              errors.shippingStreet?.message,
              errors.shippingCity?.message,
              errors.shippingPostalCode?.message,
              errors.shippingCountry?.message,
            ]}
          />
          <AddressBox
            title="Billing Address"
            checkboxLabel="Set as default billing address"
            names={billingAddressInputNames}
            control={control}
            helperTexts={[
              errors.billingStreet?.message,
              errors.billingCity?.message,
              errors.billingPostalCode?.message,
              errors.billingCountry?.message,
            ]}
          />
        </Box>

        <SameAddressCheckbox />
        <SignupButton />
      </Box>
    </FormControl>
  );
};
