<script lang="ts">
export const prerender = 'auto'
  import { page } from "$app/stores";
  import BackButton from "../../../components/BackButton.svelte";
  const Id = $page.params.Id;
  
  let embedURL = `https://multiembed.mov/directstream.php?video_id=${Id}&tmdb=1&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;

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
