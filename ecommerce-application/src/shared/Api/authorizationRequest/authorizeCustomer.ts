import { createClientWitAnonimousToken } from '../createClientWithAnonymousToken/createClientWithAnonymousToken';
import { handleRequest } from './handleRequest';
import type { IAuthorizationData } from './Lib/types';

export const authorizeCustomer = (data: IAuthorizationData): Promise<unknown> => {
  const customer = createClientWitAnonimousToken()
    .me()
    .login()
    .post({ body: { ...data } })
    .execute();
  return handleRequest(customer, data.email, data.password);
};
