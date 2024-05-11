import * as yup from 'yup';

const regExpEmail = /^\S+@\S+\.\S+$/;
export const schema = yup.object().shape({
  email: yup.string().required('Field is required').matches(regExpEmail, 'Invalid email format'),
  password: yup
    .string()
    .required('Field is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^[^\s]/, 'Password cannot start with a space')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[^\s]$/, 'Password cannot end with a space'),
});
