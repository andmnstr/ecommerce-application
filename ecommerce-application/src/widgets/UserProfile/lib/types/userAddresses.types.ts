import type { Address } from '@commercetools/platform-sdk';
import type { Control } from 'react-hook-form';

export interface IUserAddressesFields {
  streetName: string;
  city: string;
  postalCode: string;
  fullCountry: string;
}

export type InputNames = 'streetName' | 'city' | 'postalCode' | 'fullCountry';

export interface IInputProps {
  name: InputNames;
  control: Control<IUserAddressesFields>;
  label: string;
  helperText: string | undefined;
  error: boolean;
  value: string;
}

export interface IUserAddressesProps {
  address: Address;
  version: number;
  onCancel: () => void;
}
