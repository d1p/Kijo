<script lang="ts">
    import "../app.css";
  import Footer from "../components/Footer.svelte";
  import TitleBar from "../components/TitleBar.svelte";
  </script>
<div class="dark:bg-black">
  <TitleBar />

  <slot />
  <Footer />
</div>

<style>
  .titlebar {
  height: 50px;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}
</style>