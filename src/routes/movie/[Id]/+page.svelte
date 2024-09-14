<script>
  import { page } from "$app/stores";
  const Id = $page.params.Id;

  let embedURL = `https://multiembed.mov/directstream.php?video_id=${Id}&tmdb=1&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;
</script>

<div>
<iframe
    src={embedURL}
    allowFullScreen
    title="Embedded Video"
></iframe>
</div>

<style>
    iframe {
        width: 100%;
        height: 100vh;
    }
</style>
