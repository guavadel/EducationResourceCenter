import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 
        'http://localhost:3000'
      },
      '/profile': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/resources': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // Add other API routes as needed
    },
  },
);
