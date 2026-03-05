// vite.config.js  ← place in project root
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']   // ← this line fixes the Recharts useContext null + invalid hook error
  }
})