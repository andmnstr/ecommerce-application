import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  define: {
    global: {},
  },
});
