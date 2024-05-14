import type React from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import type { IRegistrationFields } from '../../lib/RegistrationFieldsInterface';

interface IInputProps {
  name:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'shippingStreet'
    | 'shippingCity'
    | 'billingStreet'
    | 'billingCity';
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
            type={name === 'password' ? 'password' : 'text'}
            label={label}
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
