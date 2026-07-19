import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  json: {
    stringify: true
  }
});

export default defineConfig({
  plugins: [react()],
})
