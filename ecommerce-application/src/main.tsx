import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';

const root = document.createElement('root') as HTMLDivElement;
root.setAttribute('id', 'root');

document.body.append(root);

ReactDOM.createRoot(root).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </StyledEngineProvider>
);
