<script lang="ts">
  import { onMount } from "svelte";
  import ContentSideScrollBlock from "../components/ContentSideScrollBlock.svelte";
  let popularMovies: any[] = [];
    let popularTv: any[] = [];
    // load api key from .env file
    const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  async function getMediaData(
    type: string = "movie",
    page: number = 1,
    sortBy: string = "popularity.desc"
  ): Promise<any> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${API_KEY}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${type}/week?language=en-US&page=${page}&sort_by=${sortBy}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async function getPopularMovies(page: number = 1) {
    const data = await getMediaData("movie", page, "popularity.desc");
    const movies = data.results.map((movie: any) => {
      return {
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        rating: movie.vote_average,
      };
    });
    popularMovies = [...popularMovies, ...movies];
  }

  async function getPopularTv(page: number = 1) {
    console.log("getPopularTv");
    const data = await getMediaData("tv", page, "popularity.desc");
    const tv = data.results.map((movie: any) => {
      return {
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        rating: movie.vote_average,
      };
    });
    popularTv = [...popularTv, ...tv];
  }

  onMount(() => {
    getPopularMovies();
    getPopularTv();
  });
</script>

<ContentSideScrollBlock
  cards={popularMovies}
  contentBlockType="Trending movies"
  loadMore={getPopularMovies}
/>

<ContentSideScrollBlock
  cards={popularTv}
  contentBlockType="Trending TV shows"
  loadMore={getPopularTv}
/>
