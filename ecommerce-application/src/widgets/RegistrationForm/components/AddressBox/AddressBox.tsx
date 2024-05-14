import { Box, Typography } from '@mui/material';
import type React from 'react';
import type { Control } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';
import type { InputNames } from '../../lib/InputNamesType';
import type { IRegistrationFields } from '../../lib/RegistrationFieldsInterface';
import { InputWithController } from '../InputWithController/InputWithController';
import classes from '../RegistrationForm.module.scss';

interface IAddressBoxProps {
  title: string;
  checkboxLabel: string;
  control: Control<IRegistrationFields>;
  names: InputNames[];
  helperTexts: (string | undefined)[];
}

export const AddressBox: React.FC<IAddressBoxProps> = props => {
  const { title, checkboxLabel, control, names, helperTexts } = props;
  return (
    <Box className={classes.addressBox}>
      <Typography
        variant="body1"
        component="h3"
      >
        {title}
      </Typography>

      <InputWithController
        name={names[0]}
        control={control}
        label="Street"
        helperText={helperTexts[0]}
      />
      <InputWithController
        name={names[1]}
        control={control}
        label="City"
        helperText={helperTexts[1]}
      />
      <CustomInputText label="Postal Code" />
      <CustomInputText label="Country" />
      <FormCheckbox label={checkboxLabel} />
    </Box>
  );
};
