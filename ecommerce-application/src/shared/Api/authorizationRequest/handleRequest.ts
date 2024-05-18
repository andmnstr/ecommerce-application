import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

import { createClientWithAccessToken } from './createClientWithAccessToken';

export const handleRequest = (
  customer: Promise<ClientResponse<CustomerSignInResult>>,
  email: string,
  password: string
): void => {
  customer
    .then(() => {
      createClientWithAccessToken(email, password);
    })
    .catch(() => {});
};
