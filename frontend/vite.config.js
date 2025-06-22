import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',  // Ensure correct relative paths — '/' is safe for Render
  plugins: [react()],
});
