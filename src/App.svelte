<script>
  import { Colors } from "./constants";
  import MainScreen from "./screens/index.svelte";
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");

  :global(body) {
    padding: 0;
    background: #5a5a5a;
  }
  :global(*) {
    color: #faf8ff;
    font-family: "Nunito", sans-serif;
  }

  main {
    height: 100%;
    width: 100%;
    overflow: scroll;
    overflow: -moz-scrollbars-none;
  }

  main::-webkit-scrollbar {
    width: 0 !important;
  }
</style>

<main style="background: {Colors.MineShaft}">
  <MainScreen />
</main>
