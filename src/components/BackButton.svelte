<script lang="ts">
  import { goto } from "$app/navigation";
  export let url: string = "";
</script>

<button
  class="bg-gray-900 text-white rounded-full p-3 absolute top-6 left-6 flex items-center hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-110 hover:bg-opacity-50 backdrop-filter backdrop-blur-lg"
  on:click={() => {
    if (url) {
      window.location.href = url;
    } else {
      history.back();
    }
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
</button>