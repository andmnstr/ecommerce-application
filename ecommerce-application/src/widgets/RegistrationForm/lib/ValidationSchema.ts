import * as yup from 'yup';

const regExpEmail = /^\S+@\S+\.\S+$/;
const regExpName = /^[a-zA-Z]+$/;

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('Field is required')
    .min(1, 'Enter at least one character')
    .matches(regExpName, 'No special characters/numbers'),

  lastName: yup
    .string()
    .trim()
    .required('Field is required')
    .min(1, 'Enter at least one character')
    .matches(regExpName, 'No special characters/numbers'),

  email: yup.string().required('Field is required').matches(regExpEmail, 'Invalid email format'),

  password: yup
    .string()
    .required('Field is required')
    .matches(/^[^\s]/, 'Password cannot start with a space')
    .min(8, 'Enter at least 8 characters')
    .matches(/\d/, 'Use at least one digit')
    .matches(/[A-Z]/, 'Use at least one uppercase letter')
    .matches(/[a-z]/, 'Use at least one lowercase letter')
    .matches(/[^\s]$/, 'Password cannot end with a space'),
});
