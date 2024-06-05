import * as yup from 'yup';

import { validationRules } from '../../../shared';

export const personalInformationSchema = yup.object().shape({
  firstName: validationRules.namesAndCity,
  lastName: validationRules.namesAndCity,
  dateOfBirth: validationRules.dateOfBirth,
  email: validationRules.email,
});
