import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import compress from 'astro-compress';
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://astro.build/config
export default defineConfig({
  integrations: [
    compress()
  ],
  devToolbar: {
    enabled: false
  },
  output: 'server',
  adapter: node({
    mode: "middleware"
  }),
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
})
