<script>
    export let movieTitle;
    export let moviePoster;
    export let movieRating;
</script>

<style>
    .card {
        position: relative;
        min-width: 300px;
        height: 400px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .rating {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 5px;
        font-size: 14px;
    }
</style>

<div class="card mr-4">
    <img class="poster transition-all duration-300 hover:scale-110" src={moviePoster} alt={movieTitle} />
    <div class="rating">{Math.round(movieRating * 10) / 10}</div>
</div>