<script>
  import { onMount } from "svelte";

  onMount(() => {
    const handleMouseMove = (event) => {
      if (event.clientY >= 0 && event.clientY <= 50) {
        document.documentElement.setAttribute("data-tauri-drag-region", "true");
      } else {
        document.documentElement.removeAttribute("data-tauri-drag-region");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeAttribute("data-tauri-drag-region"); // Clean up when unmounting
    };
  });
</script>
