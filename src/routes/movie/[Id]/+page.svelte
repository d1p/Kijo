<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import BackButton from '../../../components/BackButton.svelte';
  const Id = $page.params.Id;

  let embedURL = `https://multiembed.mov/directstream.php?video_id=${Id}&tmdb=1&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;

  let showUI = false; // Boolean to control the visibility of the back button and info

  // Function to handle mouse movement globally
  function handleMouseMove(event) {
    // Show the UI when the mouse is near the top of the screen (e.g., within 100px from the top)
    if (event.clientY < 100) {
      showUI = true;
    } else {
      // Hide UI when the mouse moves away from the top
      showUI = false;
    }
  }

  // Attach the mousemove listener on the document body
  onMount(() => {
    document.body.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener when component is destroyed
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

  
  <!-- Fullscreen iframe container -->
  <div class="relative w-full h-screen">
    <!-- Back button and info, only visible when showUI is true -->
    {#if showUI}
      <div class="absolute top-0 left-0 w-full flex justify-between items-center bg-gray-900 bg-opacity-70 p-4">
        <!-- Back Button -->
        <button class="bg-red-500 text-white py-2 px-4 rounded-lg font-bold">
          Back
        </button>
  
        <!-- Info in the middle of the screen -->
        <div class="text-white font-semibold">
          Some Info Here
        </div>
      </div>
    {/if}
  
    <!-- Iframe takes the entire screen space -->


    <iframe
    src={embedURL}
    allowFullScreen
    title="Embedded Video"
    class="w-full h-full"
    ></iframe>  </div>
  
  <style>
    /* Optional: Smooth fade-in and fade-out transition */
    div[style] {
      transition: opacity 0.3s ease;
    }
  </style>
  
