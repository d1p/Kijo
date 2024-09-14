<script lang="ts">
    import "../app.css";
    import Navbar from "../components/Navbar.svelte";
  </script>
  
<Navbar />

<main class="dark:bg-black">
  <slot />
</main>
