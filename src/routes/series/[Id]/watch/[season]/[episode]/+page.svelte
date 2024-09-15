<script lang="ts">
  export const prerender = "auto";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import BackButton from "../../../../../../components/BackButton.svelte";
  import { afterNavigate, goto } from "$app/navigation";
  const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  let opacity = 0;
  const Id = $page.params.Id;
  const season = $page.params.season;
  const episode = $page.params.episode;
$: embedURL = `https://multiembed.mov/directstream.php?video_id=${Id}&s=${season}&e=${episode}&tmdb=1&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;
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
        options
      );
      episodeData = await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  onMount(async () => {
    await showEpisodes();
  });
  afterNavigate(() => {
        const playerDiv = document.getElementById("player");
        playerDiv.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.src = embedURL;
        iframe.allowFullScreen = true;
        iframe.title = "Embedded Video";
        iframe.className = "w-full aspect-w-16 aspect-h-9 h-full";
        playerDiv.appendChild(iframe);
  })
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
    <BackButton />
  </div>

  <!-- Iframe takes the entire screen space -->
<div id="player" class="w-full h-full"></div>
</div>

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
