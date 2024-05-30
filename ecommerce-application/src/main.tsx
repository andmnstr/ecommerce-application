import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import { colorTheme } from './shared';

const root = document.createElement('root') as HTMLDivElement;
root.setAttribute('id', 'root');

document.body.append(root);

ReactDOM.createRoot(root).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={colorTheme}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </StyledEngineProvider>
);
