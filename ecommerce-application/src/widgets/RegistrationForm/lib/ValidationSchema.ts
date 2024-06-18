import * as yup from 'yup';

import { validationRules } from '../../../shared';

export const schema = yup.object().shape({
  firstName: validationRules.namesAndCity,
  lastName: validationRules.namesAndCity,
  email: validationRules.email,
  password: validationRules.password,
  dateOfBirth: validationRules.dateOfBirth,

  shippingStreet: validationRules.streetAndCountry,
  billingStreet: validationRules.streetAndCountry,

  shippingCity: validationRules.namesAndCity,
  billingCity: validationRules.namesAndCity,

  shippingPostalCode: validationRules.postalCode,
  billingPostalCode: validationRules.postalCode,

  shippingCountry: validationRules.streetAndCountry,
  billingCountry: validationRules.streetAndCountry,
});
