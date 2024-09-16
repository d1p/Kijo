<script lang="ts">
  import BackButton from "../../../components/BackButton.svelte";

  import EpisodeCard from "../../../components/EpisodeCard.svelte";

  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { fade, blur } from "svelte/transition";
  const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const Id = $page.params.Id;
  let selectedSeason = "Select season";

  let data: {
    backdrop_path: any;
    name: any;
    first_air_date: any;
    genres: any[];
    number_of_seasons: any;
    vote_average: number;
    last_air_date: any;
    next_episode_to_air: { air_date: any };
    overview: any;
    created_by: any[];
    seasons: any;
  };
  let episodeData: {
    episodes: any[];
  };

  let isDropdownOpen = false;

  // Handle dropdown toggle
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
  // Remove the duplicate declaration of 'data'
  async function getSeriesInfo() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${Id}?language=en-US`,
        options
      );
      data = await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
  async function showEpisodes(number: string, season_name: string) {
    selectedSeason = season_name;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${Id}/season/${number}?language=en-US`,
        options
      );
      episodeData = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
    toggleDropdown();
  }

  onMount(() => {
    getSeriesInfo();
  });
</script>

{#if data}
  <div class="bg-grey-900">
    <BackButton url="/"></BackButton>
    <!-- Hero Section -->
    <div
      class="hero-bg"
      style="background-image: url('https://image.tmdb.org/t/p/original{data.backdrop_path}');"
    >
      <div
        class="flex items-end h-full bg-gradient-to-t from-gray-900 via-transparent to-transparent"
      >
        <div class="text-left text-white p-8 w-full max-w-screen-lg mx-auto">
          <h1 class="text-5xl font-bold mb-2">{data.name}</h1>
          <p class="text-lg mb-4">
            {data.first_air_date} | {data.genres
              .map((genre) => genre.name)
              .join(", ")} | {data.number_of_seasons} seasons |
            <span class="bg-yellow-300 rounded-sm px-1 mx-1"
              >{Math.round(data.vote_average * 10) / 10}</span
            >| Subtitles
          </p>
          <div class="flex space-x-4 mb-4">
            <button
              class="bg-teal-500 px-6 py-3 rounded-lg text-black font-semibold flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-5.197 3.218A1 1 0 018 13.457V6.543a1 1 0 011.555-.832l5.197 3.217a1 1 0 010 1.664z"
                />
              </svg>
              Watch Now
            </button>
          </div>
          <div>
            {#if data.last_air_date}
              <p class="text-sm"><b>Last air date</b> {data.last_air_date}</p>
            {/if}
            {#if data.next_episode_to_air}
              <p class="text-sm">
                <b>Next air date</b>: {data.next_episode_to_air.air_date}
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-900 text-white py-10 px-4">
      <div class="container mx-auto max-w-screen-lg">
        <h2 class="text-2xl font-semibold mb-4">About This Movie</h2>
        <p class="text-gray-400 leading-relaxed mb-6">{data.overview}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">Directors</h3>
            <p class="text-gray-400">
              {data.created_by.map((creator) => creator.name).join(", ")}
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Cast</h3>
            <p class="text-gray-400">Jane Doe, Jack Smith, Sarah Lee</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Genres</h3>
            <p class="text-gray-400">
              {data.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Episodes Section with Season Dropdown -->
    <div class="bg-gray-900 text-white py-10 px-4">
      <div class="container mx-auto max-w-screen-lg">
        <h3 class="text-xl font-semibold">
          {data.number_of_seasons} seasons available
        </h3>
        <!-- Dropdown Component -->
        <div class="container mx-auto py-6 m">
          <div class="relative inline-block w-full max-w-lg">
            <!-- Made selector wider with max-w-lg -->
            <!-- Dropdown button -->
            <div
              class="bg-gray-800 text-white py-2 px-4 rounded-lg cursor-pointer flex justify-between items-center"
              on:click={toggleDropdown}
            >
              <span>{selectedSeason}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>

            <!-- Dropdown menu opening upwards with season info and cover images -->
            {#if isDropdownOpen}
              <div
                transition:fade={{ delay: 0, duration: 50 }}
                class="absolute z-10 bg-gray-700 text-white bottom-full mb-2 rounded-lg shadow-lg w-full max-h-[75vh] overflow-y-auto"
              >
                <!-- Max height 75% of viewport, scrollable -->
                {#each data.seasons as season}
                  <div
                    class="flex py-4 px-6 hover:bg-gray-600 cursor-pointer"
                    on:click={showEpisodes(season.season_number, season.name)}
                  >
                    <!-- Season Cover -->
                    <img
                      src="https://image.tmdb.org/t/p/w200{season.poster_path}"
                      alt={season.name}
                      class="w-16 h-16 rounded-lg object-cover mr-4"
                    />

                    <!-- Season Info -->
                    <div>
                      <h3 class="text-xl font-semibold">{season.name}</h3>
                      <p class="text-gray-400 mt-2">{season.overview}</p>
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
        {#if episodeData && episodeData.episodes}
          <div class="space-y-4">
            {#each episodeData.episodes as episode}
              <EpisodeCard
                id={Id}
                season={episode.season_number}
                poster={episode.still_path}
                episode={episode.episode_number}
                name={episode.name}
                overview={episode.overview}
                airDate={episode.air_date}
                voteAverage={episode.vote_average}
                runtime={episode.runtime}
              ></EpisodeCard>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .hero-bg {
    background-size: cover;
    background-position: center;
    height: 80vh;
  }
</style>
