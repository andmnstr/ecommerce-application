import type React from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import type { InputNames } from '../../lib/InputNamesType';
import type { IRegistrationFields } from '../../lib/RegistrationFieldsInterface';

interface IInputProps {
  name: InputNames;
  control: Control<IRegistrationFields>;
  label: string;
  helperText: string | undefined;
}

export const InputWithController: React.FC<IInputProps> = props => {
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
            type={label === 'Password' ? 'password' : 'text'}
            fullWidth
            autoComplete="false"
            helperText={helperText ?? ' '}
            error={typeof helperText === 'string'}
          />
        );
      }}
    />
  );
};
