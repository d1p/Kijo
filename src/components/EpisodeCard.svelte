<script lang="ts">
  import {blur} from "svelte/transition";
  export let episodeNumber: string = "";
  export let name: string = "";
  export let overview: string = "";
  export let poster: string = "";
  export let airDate: string = "";
  export let voteAverage: number = 0;
  export let runtime: number = 0;
</script>

<div class="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg" transition:blur={{ amount: 10 }}>
  <img
    src={`https://image.tmdb.org/t/p/w200${poster}`}
    alt={`Episode ${episodeNumber}`}
    class="w-40 h-24 object-cover rounded-md"
  />
  <div class="flex-grow">
    <h3 class="text-xl font-semibold">
      {`Episode ${episodeNumber}: ${name}`}
    </h3>
    <p class="text-gray-400">
      {`${runtime} min | ${overview}`}
    </p>
    <div class="flex items-center space-x-2 mt-2">
      <span class="text-gray-400">Air Date:</span>
      <span class="text-gray-200">{airDate}</span>
    </div>
    <div class="flex items-center space-x-2 mt-2">
      <span class="text-gray-400">Rating:</span>
      <span class="text-gray-200">{Math.round(voteAverage * 10) / 10}</span>
    </div>
  </div>
  <button class="bg-yellow-500 px-4 py-2 rounded-lg text-black font-semibold">
    Play
  </button>
</div>
