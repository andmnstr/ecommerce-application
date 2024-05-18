import MenuItem from '@mui/material/MenuItem';
import type React from 'react';
import { Controller } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import { countries } from '../../consts/RegistrationForm.consts';
import type { IInputProps } from '../../lib/types/InputProps';

export const SelectWithController: React.FC<IInputProps> = props => {
  const { name, control, label, helperText } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <CustomInputText
            onChange={field.onChange}
            label={label}
            type="text"
            fullWidth
            autoComplete="false"
            helperText={helperText ?? ' '}
            error={typeof helperText === 'string'}
            id="select"
            select
            defaultValue=""
            style={{ textAlign: 'start' }}
          >
            {countries.map((item: string) => {
              return (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              );
            })}
          </CustomInputText>
        );
      }}
    />
  );
};
