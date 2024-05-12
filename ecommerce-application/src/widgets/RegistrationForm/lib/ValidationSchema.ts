import * as yup from 'yup';

const regExpEmail = /^\S+@\S+\.\S+$/;
const regExpName = /^[a-zA-Z]+$/;

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('Field is required')
    .min(1, 'First Name must contain at least one character')
    .matches(regExpName, 'First Name cannot contain special characters or numbers'),

  lastName: yup
    .string()
    .trim()
    .required('Field is required')
    .min(1, 'Last Name must contain at least one character')
    .matches(regExpName, 'Last Name cannot contain special characters or numbers'),

  email: yup.string().required('Field is required').matches(regExpEmail, 'Invalid email format'),

  password: yup
    .string()
    .required('Field is required')
    .matches(/^[^\s]/, 'Password cannot start with a space')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[^\s]$/, 'Password cannot end with a space'),
});
