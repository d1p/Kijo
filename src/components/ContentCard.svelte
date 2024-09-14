<script>
  /**
   * @type {string}
   */
   export let id;
  export let title;
  export let poster;
  export let rating;
  /**
   * @type {string}
   */
   export let type;

  function getUrl() {
    return type === "movie" ? `/movie/${id}` : `/series/${id}`;
  }
</script>

<div class="flex-none w-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
  <div class="flex-none w-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <div class="h-96 relative">
      <a href="{getUrl()}" aria-label="{title}"
        ><img
          class="w-full h-full object-cover transition-all duration-300 hover:scale-110"
          src={poster}
          alt={title}
        />
      </a>
      <span
        class={`absolute top-2 left-2 ${
          rating >= 7
            ? "bg-green-400"
            : rating >= 6
              ? "bg-yellow-400"
              : "bg-red-400"
        } text-black text-xs font-bold px-2 py-1 rounded`}
      >
        {Math.round(rating * 10) / 10}
      </span>
    </div>
  </div>
</div>
