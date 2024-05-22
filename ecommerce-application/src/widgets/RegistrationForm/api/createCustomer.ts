import { createClientWitAnonimousToken } from '../../../shared';
import { handleRequest } from '../../../shared/Api/authorizationRequest/handleRequest';
import type { ICustomerDraft } from '../lib/types/customerDraft';

export const registerCustomer = (data: ICustomerDraft): Promise<unknown> => {
  const customer = createClientWitAnonimousToken()
    .me()
    .signup()
    .post({ body: { ...data } })
    .execute();
  return handleRequest(customer, data.email, data.password);
};
