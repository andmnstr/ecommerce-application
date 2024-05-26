import type { Address } from '@commercetools/platform-sdk';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import type React from 'react';

import { countries } from '../../../../shared/consts/countries';
import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import classes from '../UserProfile.module.scss';

interface IAddressBoxProps {
  address: Address;
}

const AddressBox: React.FC<IAddressBoxProps> = ({ address }) => {
  const { streetName, postalCode, city, country } = address;
  const fullCountry = countries.filter((item: string[]) => {
    return item[1] === country;
  })[0][0];
  return (
    <Box className={classes.AddressContainer}>
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
    </Box>
  );
};

export default AddressBox;
