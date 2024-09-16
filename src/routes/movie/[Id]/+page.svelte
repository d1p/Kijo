<script lang="ts">
export const prerender = 'auto'
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import BackButton from "../../../components/BackButton.svelte";
  import getIframe from "../../../utils/iframe";
  import { fetch } from '@tauri-apps/api/http';

  const Id = $page.params.Id;
  
  let embedURL: string = ``
  onMount(async () => {
    const url =  getIframe(Id);
    let response = await fetch(url, {method: 'GET', responseType: 2});
    embedURL = response.data;
  });


</script>

<!-- Fullscreen iframe container -->
<div class="relative w-full h-screen">
  <!-- Back button and info, only visible when showUI is true -->
  <div class="absolute top-0 left-0 h-64">
    <BackButton />  
  </div>

  <!-- Iframe takes the entire screen space -->

  <iframe
    id="player"
    src={embedURL}
    allowFullScreen
    title="Embedded Video"
    class="w-full h-full"
  ></iframe>
</div>
<style>
  /* Optional: Smooth fade-in and fade-out transition */
  .transparent {
    opacity: 0;
  }
  div[style] {
    transition: opacity 0.3s ease;
  }
</style>
