import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-middleware',
      configureServer(server) {
        return () => {
          server.middlewares.use('/api/visits', async (req, res) => {
            try {
              const { default: handler } = await import('./api/visits.js')
              await handler(req, res)
            } catch (error) {
              console.error('API error:', error)
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'API Error' }))
            }
          })
        }
      },
    },
  ],
})
