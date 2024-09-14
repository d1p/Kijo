export default async function getIframe(id, season = null, episode = null) {
    return new Promise(async (resolve, reject) => {
      let URL;
      if (!season && !episode) {
        URL = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;
      } else {
        URL = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&season=${season}&episode=${episode}&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;
      }
      resolve(URL)
    });
  }