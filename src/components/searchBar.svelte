<script>
  import InputBox from "../reusables/inputBox.svelte";
  import { Colors, Themes } from "../constants";
  import {
    MdBrightness4,
    MdBrightness5,
    MdSearch
  } from "../reusables/icons.js";
  import { currentTheme } from "../store/store.js";

  let screenWidth;
  const { DARK, LIGHT } = Themes;

  const updateScreenSize = () => {
    screenWidth = window.innerWidth;
  };

  window.addEventListener("resize", updateScreenSize);
  window.onload = updateScreenSize();

  const toggleMode = () => {
    if ($currentTheme === DARK) $currentTheme = LIGHT;
    else $currentTheme = DARK;
  };
</script>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .search-icon,
  .mode-icon {
    height: 35px;
    padding: 0;
    padding-top: 8px;
    width: 35px;
    margin-right: 12px;
  }

  @media only screen and (max-width: 480px) {
    header {
      padding: 20px !important;
    }
  }
</style>

<header
  style="background: {Colors.Scorpion}; padding: 20px {screenWidth * 0.2}px">
  <div class="search-icon">
    <MdSearch />
  </div>

  <InputBox placeholder="Search anything...." />

  <div class="mode-icon" on:click={() => toggleMode()}>
    {#if $currentTheme === DARK}
      <MdBrightness4 />
    {:else}
      <MdBrightness5 />
    {/if}
  </div>
</header>
