import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type React from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import type { IRegistrationFields } from '../../lib/RegistrationFieldsInterface';

interface IDateInputProps {
  control: Control<IRegistrationFields>;
  helperText: string | undefined;
}

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
              views={['day', 'month', 'year']}
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