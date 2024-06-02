import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import type React from 'react';
import { Controller } from 'react-hook-form';

import { countries } from '../../../../../shared/consts/countries';
import type { IInputProps } from '../../../lib/types/userAddresses.types';

export const SelectWithController: React.FC<IInputProps> = props => {
  const { name, control, label, helperText, error, value } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            label={label}
            type="text"
            fullWidth
            autoComplete="false"
            helperText={helperText ?? ' '}
            error={error}
            id="select"
            select
            defaultValue={value}
            style={{ textAlign: 'start' }}
          >
            {countries.map((item: string[]) => {
              return (
                <MenuItem
                  key={item[0]}
                  value={item[0]}
                >
                  {item[0]}
                </MenuItem>
              );
            })}
          </TextField>
        );
      }}
    />
  );
};
