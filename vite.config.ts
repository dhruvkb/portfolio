import { defineConfig } from 'vite' // eslint-disable-line import/no-extraneous-dependencies
import vue from '@vitejs/plugin-vue' // eslint-disable-line import/no-extraneous-dependencies

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
})
