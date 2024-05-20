import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, FormControl, Stack } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { registerCustomer } from '../../api/createCustomer';
import { billingAddressInputNames, countries, shippingAddressInputNames } from '../../consts/RegistrationForm.consts';
import type { ICustomerDraft } from '../../lib/types/customerDraft';
import { ErrorMessages } from '../../lib/types/errorMessagesEnum';
import type { IRegistrationFields } from '../../lib/types/RegistrationFields';
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
    getValues,
    control,
    formState: { errors },
  } = useForm<IRegistrationFields>({
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

  const submitForm: SubmitHandler<IRegistrationFields> = async () => {
    const dateOfBirth = new Date(getValues('dateOfBirth'));

    const userData: ICustomerDraft = {
      firstName: getValues('firstName'),
      lastName: getValues('lastName'),
      dateOfBirth: `${dateOfBirth.getFullYear()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getDate()}`,
      email: getValues('email'),
      password: getValues('password'),
      addresses: [
        {
          streetName: getValues('shippingStreet'),
          city: getValues('shippingCity'),
          postalCode: getValues('shippingPostalCode'),
          country: countries.filter(item => {
            return item[0] === getValues('shippingCountry');
          })[0][1],
        },
        {
          streetName: getValues('billingStreet'),
          city: getValues('billingCity'),
          postalCode: getValues('billingPostalCode'),
          country: countries.filter(item => {
            return item[0] === getValues('billingCountry');
          })[0][1],
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };

    const registrationResponse = await registerCustomer(userData);

    if (typeof registrationResponse === 'number') {
      const message = registrationResponse === 400 ? ErrorMessages.WrongLoginOrPasswordError : ErrorMessages.OtherError;
      showError(message);
    } else {
      hideError();
    }
  };

  return (
    <FormControl>
      <Alert
        severity="error"
        variant="filled"
        className={className}
      >
        {errorMessage}
      </Alert>
      <Box
        component="form"
        className={classes.form}
        onSubmit={handleSubmit(submitForm)}
      >
        <Stack
          direction="row"
          className={classes.stack}
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
          className={classes.stack}
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
