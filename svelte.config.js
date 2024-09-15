// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      // use relative URLs similar to an anchor tag <a href="/test/1"></a>
      // do not include group layout folders in the path such as /(group)/test/1
  entries: ['/','/movie/1', '/series/2', '/series/1/watch/1/1']
}
  },
  
};

export default config;
