<script lang="ts">
  export const prerender = "auto";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import BackButton from "../../../../../../components/BackButton.svelte";
  import { fetch } from '@tauri-apps/api/http';

  import getIframe from "../../../../../../utils/iframe";
  import { afterNavigate } from "$app/navigation";
  const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  let opacity = 0;
  $: Id = $page.params.Id;
  $: season = $page.params.season;
  $: episode = $page.params.episode;
  $: embedURL = "";
  let episodeData: { episodes: any[] } = { episodes: [] };

  async function showEpisodes() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${Id}/season/${season}?language=en-US`,
         { ...options }
      );
      episodeData = response.data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async function setIframe() {
    const url = getIframe(Id, season, episode);
    let response = await fetch(url, { method: "GET", responseType: 2 });
    embedURL = response.data;
  }

  onMount(async () => {
    await showEpisodes();
  });

  afterNavigate(async () => {
    await setIframe();
  });

</script>

<!-- Fullscreen iframe container -->
<div
    class="absolute top-0 right-0 h-5/6 w-96 px-2 py-6 custom text-white bg-slate-900 overflow-scroll" 
    on:mouseenter={() => (opacity = 1)}
    on:mouseleave={() => {
        setTimeout(() => {
            opacity = 0;
        }, 2000);
    }}
    style={`opacity: ${opacity}; border-bottom-left-radius: 4px`}
    role="dialog"
>
  {#if episodeData && episodeData.episodes}
    {#each episodeData.episodes as e}
      <a href={`/series/${Id}/watch/${season}/${e.episode_number}`}>
        <div class="flex mb-4 p-2 rounded bg-slate-800 items-center">
          <img
            src={`https://image.tmdb.org/t/p/w200${e.still_path}`}
            alt={`Episode ${episode}: ${e.name}`}
            class="h-16 mr-4"
          />
          <div>
            <h3 class="text-l font-medium">{e.name}</h3>
            <p class="text-sm">{e.overview}</p>
          </div>
        </div>
      </a>
    {/each}
  {/if}
</div>
<div class="relative w-full h-screen">
  <!-- Back button and info, only visible when showUI is true -->
  <div class="absolute top-0 left-0 h-64">
    <BackButton url="/series/{Id}"/>
  </div>
  <iframe
  src={embedURL}
  allowFullScreen
  title="Player"
  class="w-full h-full"
></iframe>
</div>

  <!-- Iframe takes the entire screen space -->


<style>
  /* Optional: Smooth fade-in and fade-out transition */
  .transparent {
    opacity: 0;
  }
  div[style] {
    transition: opacity 0.3s ease;
  }
  .custom {
    background-color: #111;
    z-index: 100;
  }
</style>
