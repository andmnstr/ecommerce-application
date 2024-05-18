import type { DateView } from '@mui/x-date-pickers';

import type { InputNames } from '../lib/types/InputNamesType';

export const countries = ['Finland', 'France', 'Germany', 'Italy', 'Serbia'];
export const dateView: DateView[] = ['day', 'month', 'year'];
export const addressBoxLabels = ['Street', 'City', 'Postal Code', 'Country'];
export const addressBoxInputs = [0, 1, 2];
export const shippingAddressInputNames: InputNames[] = [
  'shippingStreet',
  'shippingCity',
  'shippingPostalCode',
  'shippingCountry',
];
export const billingAddressInputNames: InputNames[] = [
  'billingStreet',
  'billingCity',
  'billingPostalCode',
  'billingCountry',
];
