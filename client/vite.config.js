// client/vite.config.js (AFTER)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ==================== ADD THIS BLOCK ====================
  // This 'server' block configures the Vite development server.
  server: {
    // The 'proxy' object is where we define our proxy rules.
    proxy: {
      // This rule says that any request starting with '/api'
      // should be proxied to our backend server.
      '/api': {
        // The target is the URL of our backend Express server.
        target: 'http://localhost:5000',
        // 'changeOrigin: true' is crucial. It changes the 'Host' header
        // of the request to match the target's origin. This is often
        // required for the backend to correctly process the request.
        changeOrigin: true,
      },
    }
  }
  // =======================================================
})