import { createClientWitAnonimousToken } from '../createClientWithAnonymousToken/createClientWithAnonymousToken';
import { handleRequest } from './handleRequest';

export const authorizeCustomer = (data: { email: string; password: string }): void => {
  const customer = createClientWitAnonimousToken()
    .me()
    .login()
    .post({ body: { ...data } })
    .execute();
  handleRequest(customer, data.email, data.password);
};
