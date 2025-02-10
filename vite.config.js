import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    port: 5173, // Use a number, not a string
    host: true, // Expose the server to the network
  },
});
