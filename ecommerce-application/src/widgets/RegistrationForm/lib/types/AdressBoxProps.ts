import type { Control } from 'react-hook-form';

import type { InputNames } from './InputNamesType';
import type { IRegistrationFields } from './RegistrationFields';

export interface IAddressBoxProps {
  title: string;
  checkboxLabel: string;
  control: Control<IRegistrationFields>;
  names: InputNames[];
  helperTexts: (string | undefined)[];
  defaultFlag: () => void;
}
