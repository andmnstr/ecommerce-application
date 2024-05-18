import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type React from 'react';
import { Controller } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import { dateView } from '../../consts/RegistrationForm.consts';
import type { IDateInputProps } from '../../lib/types/DateInputProps';

export const DateInputWithController: React.FC<IDateInputProps> = props => {
  const { control, helperText } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              onChange={field.onChange}
              label="Date of Birth"
              views={dateView}
              format="DD/MM/YYYY"
              slots={{
                textField: CustomInputText,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  autoComplete: 'false',
                  helperText: helperText ?? ' ',
                  error: typeof helperText === 'string',
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};
