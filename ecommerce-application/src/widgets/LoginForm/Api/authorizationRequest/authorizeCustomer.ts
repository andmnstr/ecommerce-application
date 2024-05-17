import { createClientWitAnonimousToken } from '../../../../shared/Api/createClientWithAnonymousToken/createClientWithAnonymousToken';
import { handleRequest } from './handleRequest';

export const authorizeCustomer = (data: { email: string; password: string }): void => {
  const apiRoot = createClientWitAnonimousToken();
  const customer = apiRoot
    .me()
    .login()
    .post({ body: { ...data } })
    .execute();
  handleRequest(customer, data.email, data.password);
};
