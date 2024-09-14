<script>
  import SearchBox from "./SearchBox.svelte";

</script>
<header>
    <nav class="flex justify-around px-4 py-4 ">
        <aside>
            <a href="/">
                <h1>Kijo</h1>
            </a>
        </aside>
        <main>
            <SearchBox />
        </main>
    </nav>
</header>

<style>
    @font-face {
        font-family: 'playwrite_cu';
        src: url('Playwrite_CU/PlaywriteCU-VariableFont_wght.ttf') format('truetype');
    }

    h1 {
        font-family: 'playwrite_cu', sans-serif;
        font-size: 2rem;
    }
    header {
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        padding: 10px;
    }
</style>