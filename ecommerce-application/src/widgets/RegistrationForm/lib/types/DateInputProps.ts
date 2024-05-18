import type { Control } from 'react-hook-form';

import type { IRegistrationFields } from './RegistrationFields';

export interface IDateInputProps {
  control: Control<IRegistrationFields>;
  helperText: string | undefined;
}
