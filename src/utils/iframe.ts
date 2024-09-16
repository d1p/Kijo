export default function getIframe(id: string, season: string = "", episode: string = ""): string {
      let URL;
      if (!season && !episode) {
        URL = `https://getsuperembed.link/?video_id=${id}&tmdb=1&player_secondary_color=10b981&player_primary_color=10b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;
      } else {
        URL = `https://getsuperembed.link/?video_id=${id}&tmdb=1&season=${season}&episode=${episode}&player_secondary_color=10b981&player_primary_color=20b981&player_sources_toggle_type=2&player_loader=3&player_bg_color=1e1d28`;
      }
    return URL;
  }