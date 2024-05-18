import { createClientWitAnonimousToken } from '../createClientWithAnonymousToken/createClientWithAnonymousToken';
import { handleRequest } from './handleRequest';
import type { IAuthorizationData } from './Lib/types';

export const authorizeCustomer = (data: IAuthorizationData): void => {
  const customer = createClientWitAnonimousToken()
    .me()
    .login()
    .post({ body: { ...data } })
    .execute();
  handleRequest(customer, data.email, data.password);
};
