import * as yup from 'yup';

import { validationRules } from '../../../shared';

export const userAddressesSchema = yup.object().shape({
  streetName: validationRules.streetAndCountry,
  city: validationRules.namesAndCity,
  postalCode: validationRules.postalCode,
  fullCountry: validationRules.streetAndCountry,
});
