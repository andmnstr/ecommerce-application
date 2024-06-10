import type { LocalizedString } from '@commercetools/platform-sdk';

import type { IColorValue } from './types';

export const isColorValue = (value: unknown): value is IColorValue => {
  return true;
};

export const isLocalizedString = (value: unknown): value is LocalizedString => {
  return true;
};
