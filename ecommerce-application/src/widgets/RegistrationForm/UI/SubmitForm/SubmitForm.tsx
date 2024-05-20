import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, FormControl, Stack } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { registerCustomer } from '../../api/createCustomer';
import { billingAddressInputNames, countries, shippingAddressInputNames } from '../../consts/RegistrationForm.consts';
import type { IAddress, ICustomerDraft } from '../../lib/types/customerDraft';
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
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IRegistrationFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [className, setClassName] = useState(classes.invisible);
  const [errorMessage, setErrorMessage] = useState('');
  const [sameAddresses, setSameAddresses] = useState(false);
  const [defaultShipAddress, setDefaultShipAddress] = useState(false);
  const [defaultBillAddress, setDefaultBillAddress] = useState(false);
  const showError = (message: string): void => {
    setClassName(classes.visible);
    setErrorMessage(message);
  };
  const hideError = (): void => {
    setClassName(classes.invisible);
  };

  const navigate = useNavigate();

  const submitForm: SubmitHandler<IRegistrationFields> = async () => {
    register('billingStreet');
    register('billingCity');
    register('billingPostalCode');
    register('billingCountry');

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
      defaultShippingAddress: undefined,
      defaultBillingAddress: undefined,
    };

    if (sameAddresses) {
      const firstAddress = JSON.stringify(userData.addresses[0]);

      if (firstAddress) {
        const secondAddress: IAddress = JSON.parse(firstAddress) as IAddress;
        userData.addresses[1] = secondAddress;
      }
    }

    if (defaultShipAddress) {
      userData.defaultShippingAddress = 0;
    }

    if (defaultBillAddress) {
      userData.defaultBillingAddress = 1;
    }

    const registrationResponse = await registerCustomer(userData);

    if (typeof registrationResponse === 'number') {
      const message = registrationResponse === 400 ? ErrorMessages.WrongLoginOrPasswordError : ErrorMessages.OtherError;
      showError(message);
    } else {
      navigate('/');
      hideError();
    }
  };

  const makeSameAddresses = (): void => {
    setSameAddresses(!sameAddresses);

    if (!sameAddresses) {
      setValue('billingStreet', getValues('shippingStreet'));
      setValue('billingCity', getValues('shippingCity'));
      setValue('billingPostalCode', getValues('shippingPostalCode'));
      setValue('billingCountry', getValues('shippingCountry'));
    }
  };

  const makeDefaultShipAddress = (): void => {
    setDefaultShipAddress(!defaultShipAddress);
  };

  const makeDefaultBillAddress = (): void => {
    setDefaultBillAddress(!defaultBillAddress);
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
            defaultFlag={makeDefaultShipAddress}
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
            defaultFlag={makeDefaultBillAddress}
          />
        </Box>
        <SameAddressCheckbox changeHandle={makeSameAddresses} />
        <SignupButton />
      </Box>
    </FormControl>
  );
};
