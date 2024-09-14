<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte";
  import ContentCard from "./ContentCard.svelte";
  let observer: IntersectionObserver;
  let observedElement: HTMLDivElement;
  type Card = {
    posterUrl: string;
    title: string;
    rating: number;
  };

  export let cards: Card[] = [];
  export let contentBlockType: string;
  export let loadMore: (page: number) => void;
  // use interaction observer to load more data when the user scrolls to the end of the list
  afterUpdate(() => {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const page_no: number = cards.length / 20 + 1
        loadMore(page_no);
      }
    });

    if (observedElement) {
      observer.observe(observedElement);
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

</script>

<div class="pl-10 contrainer">
  <h2 class="font-sans text-xl font-medium pt-4 mb-2 text-slate-400 underline">
    {contentBlockType}
  </h2>

  <div class="flex flex-nowrap flex-row overflow-x-auto cursor-pointer pb-5">
    {#each cards as card, index}
      <ContentCard
        moviePoster={card.posterUrl}
        movieTitle={card.title}
        movieRating={card.rating}
      />
      <!-- load more data when the user scrolls to the end of the list -->
      {#if index === cards.length - 5}
        <div class="card mr-4" bind:this={observedElement}>
          <div class="poster transition-all duration-300 hover:scale-110">
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>
