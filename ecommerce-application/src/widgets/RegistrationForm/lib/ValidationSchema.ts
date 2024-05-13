import * as yup from 'yup';

const regExpEmail = /^\S+@\S+\.\S+$/;
const regExpName = /^[a-zA-Z]+$/;
const minAge = 13 * 365 * 24 * 3600 * 1000;
const maxDateofBirth = new Date(Date.now() - minAge);

export const schema = yup.object().shape({
  firstName: yup.string().trim().required('Field is required').matches(regExpName, 'No special characters/numbers'),

  lastName: yup.string().trim().required('Field is required').matches(regExpName, 'No special characters/numbers'),

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

  dateOfBirth: yup
    .date()
    .typeError('Invalid date')
    .required('Field is required')
    .max(maxDateofBirth, 'You should be older than 13'),
});
