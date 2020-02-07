<script>
  import SearchBar from "../components/searchBar.svelte";
  import Header from "../components/header.svelte";

  let screenWidth;
  const updateScreenSize = () => {
    screenWidth = window.innerWidth;
  };

  window.addEventListener("resize", updateScreenSize);
  window.onload = updateScreenSize();
</script>

<style>
  .wrapper {
    margin: 0;
  }

  @media only screen and (max-width: 480px) {
    .body-wrapper {
      padding: 0 20px !important;
    }
  }
</style>

<div class="wrapper">
  <SearchBar />
  <div class="body-wrapper" style="padding: 0 {screenWidth * 0.2}px">
    <Header />
  </div>
</div>
