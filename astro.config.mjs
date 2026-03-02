// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://juliusheino.github.io',
  base: '/valtava-tutkimus',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
});
