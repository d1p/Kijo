<script lang="ts">
    import { fade, fly } from 'svelte/transition';
  
    let searchQuery: string = "";
    let showModal: boolean = false;
    let searchResults: any[] = [];
    let debounceTimer: number;
  
    // Debounced search function
    function handleSearch() {
      clearTimeout(debounceTimer); // Clear previous debounce if it's still pending
  
      debounceTimer = setTimeout(() => {
        // Simulate search results; Replace with API call in a real scenario
        if (searchQuery.trim()) {
          searchResults = [
            {
              title: "Stranger Things",
              image: "https://via.placeholder.com/150",
              description: "A group of kids uncover a dark secret in their small town."
            },
            {
              title: "Breaking Bad",
              image: "https://via.placeholder.com/150",
              description: "A chemistry teacher turns into a drug lord."
            },
            {
              title: "Money Heist",
              image: "https://via.placeholder.com/150",
              description: "Criminal masterminds plan the biggest heist in history."
            }
          ];
        } else {
          searchResults = [];
        }
      }, 500); // Delay of 500ms before searching
    }
  
    function closeModal() {
      showModal = false;
      searchQuery = "";
      searchResults = [];
    }
  </script>
  
  <!-- Topbar -->
  <nav class="bg-black fixed top-0 left-0 w-full z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="/" class="text-xl font-bold logo">
            <img src="/logo.png" alt="Kiko & Jojo" class="h-16" />
          </a>
        </div>
  
        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">TV Shows</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">New & Popular</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My List</a>
          </div>
        </div>
  
        <!-- Search Box (Desktop only, opens modal) -->
        <div class="flex">
          <input
            type="text"
            placeholder="Search"
            class="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            on:click={() => showModal = true}
            readonly
          />
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Search Modal -->
  {#if showModal}
    <div class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4" transition:fade>
      <div class="w-full max-w-3xl mx-auto" transition:fly={{ y: -200, duration: 500 }}>
        
        <!-- Search Input -->
        <div class="flex items-center">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search for Movies or TV Shows"
            class="w-full bg-gray-800 text-white px-4 py-4 rounded-lg focus:outline-none text-2xl"
            on:input={handleSearch}
          />
          <button on:click={closeModal} class="ml-4 text-white text-xl">✖</button>
        </div>
  
        <!-- Search Results -->
        {#if searchQuery && searchResults.length > 0}
          <div class="mt-8 grid grid-cols-1 gap-6">
            {#each searchResults as result}
              <div class="bg-gray-800 text-white rounded-lg p-4 flex items-start transition:fade}">
                <img src="{result.image}" alt="{result.title}" class="w-24 h-36 rounded-lg mr-4" />
                <div>
                  <h3 class="text-xl font-bold">{result.title}</h3>
                  <p class="mt-2 text-gray-400">{result.description}</p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
        
        {#if searchQuery && searchResults.length === 0}
          <div class="text-white mt-8 text-center text-xl}">
            No results found.
          </div>
        {/if}
      </div>
    </div>
  {/if}
  
  <style>
    /* Styling the modal close button */
    button:focus {
      outline: none;
    }
</style>