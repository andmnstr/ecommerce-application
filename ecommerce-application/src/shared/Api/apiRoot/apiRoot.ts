import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

let apiRoot: ByProjectKeyRequestBuilder;

export const setApiRoot = (newApiRoot: ByProjectKeyRequestBuilder): void => {
  apiRoot = newApiRoot;
};

export const getApiRoot = (): ByProjectKeyRequestBuilder => {
  return apiRoot;
};
