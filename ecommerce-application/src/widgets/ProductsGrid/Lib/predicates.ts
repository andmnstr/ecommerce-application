import type { IColorValue } from './types';

export const isColorValue = (value: unknown): value is IColorValue => {
  return true;
};
