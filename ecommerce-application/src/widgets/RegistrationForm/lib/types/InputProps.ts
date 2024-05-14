import type { Control } from 'react-hook-form';

import type { InputNames } from './InputNamesType';
import type { IRegistrationFields } from './RegistrationFields';

export interface IInputProps {
  name: InputNames;
  control: Control<IRegistrationFields>;
  label: string;
  helperText: string | undefined;
}
