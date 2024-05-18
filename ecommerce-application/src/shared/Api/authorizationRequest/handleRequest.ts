import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

import { createClientWithAccessToken } from './createClientWithAccessToken';

export const handleRequest = async (
  customer: Promise<ClientResponse<CustomerSignInResult>>,
  email: string,
  password: string
): Promise<void> => {
  await customer
    .then(() => {
      createClientWithAccessToken(email, password);
    })
    .catch(() => {});
};
