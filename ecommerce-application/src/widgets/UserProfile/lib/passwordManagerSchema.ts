import * as yup from 'yup';

import { validationRules } from '../../../shared';

export const passwordManagerSchema = yup.object().shape({
  currentPassword: validationRules.password,
  newPassword: validationRules.password.notOneOf(
    [yup.ref('currentPassword')],
    'Must be different from current password'
  ),
  confirmNewPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Must match the new password'),
});
