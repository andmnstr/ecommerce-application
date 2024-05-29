import type { Address, Customer } from '@commercetools/platform-sdk';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import type React from 'react';

import { countries } from '../../../../shared';
import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import classes from '../UserProfile.module.scss';

interface IAddressBoxProps {
  address: Address;
  userInfo: Customer;
}

export const AddressBox: React.FC<IAddressBoxProps> = ({ address, userInfo }) => {
  const { id, streetName, postalCode, city, country } = address;
  const { shippingAddressIds, billingAddressIds, defaultShippingAddressId, defaultBillingAddressId } = userInfo;
  const fullCountry = countries.filter((item: string[]) => {
    return item[1] === country;
  })[0][0];
  return (
    <Box className={classes.AddressContainer}>
      {shippingAddressIds && id && shippingAddressIds.includes(id) && defaultShippingAddressId !== id && (
        <Typography className={classes.AddressName}>Shipping Address</Typography>
      )}
      {billingAddressIds && id && billingAddressIds.includes(id) && defaultBillingAddressId !== id && (
        <Typography className={classes.AddressName}>Billing Address</Typography>
      )}
      {defaultShippingAddressId && id && defaultShippingAddressId === id && (
        <Typography className={classes.AddressName}>Default shipping address</Typography>
      )}
      {defaultBillingAddressId && id && defaultBillingAddressId === id && (
        <Typography className={classes.AddressName}>Default billing address</Typography>
      )}
      <Stack className={classes.AddressStack}>
        <CustomInputText
          variant="standard"
          label="Street"
          value={streetName}
          className={classes.Input}
          disabled
        />
        <CustomInputText
          variant="standard"
          label="City"
          value={city}
          className={classes.Input}
          disabled
        />
        <CustomInputText
          variant="standard"
          label="Postal Code"
          value={postalCode}
          className={classes.Input}
          disabled
        />
        <CustomInputText
          variant="standard"
          label="Country"
          value={fullCountry}
          className={classes.Input}
          disabled
        />
        <IconButton aria-label="Edit">
          <Edit />
        </IconButton>
        <IconButton aria-label="Delete">
          <DeleteForever />
        </IconButton>
      </Stack>
    </Box>
  );
};
