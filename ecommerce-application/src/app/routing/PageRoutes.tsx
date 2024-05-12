import type React from 'react';
import { Route, Routes } from 'react-router-dom';

import { pages } from './config';

export const PageRoutes: React.FC = () => {
  return (
    <>
      {pages.map(page => {
        return (
          <Routes key={page.id}>
            <Route
              path={page.path}
              element={<page.page />}
              key={page.id}
            />
          </Routes>
        );
      })}
    </>
  );
};
