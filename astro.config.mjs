// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://carlosvolweides.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});