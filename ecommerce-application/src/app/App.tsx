import type React from 'react';

import { gettingToken, setApiRoot } from '../shared';
import { PageRoutes } from './providers/router/PageRoutes';

export const App: React.FC = () => {
  setApiRoot(gettingToken());
  return <PageRoutes />;
};
