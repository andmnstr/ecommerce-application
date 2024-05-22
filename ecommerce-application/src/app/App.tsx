import type React from 'react';

import { gettingToken } from '../shared/Api';
import { PageRoutes } from './providers/router/PageRoutes';

export const App: React.FC = () => {
  gettingToken();
  return <PageRoutes />;
};
