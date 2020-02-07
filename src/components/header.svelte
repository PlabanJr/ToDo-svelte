<script>
  import { FaCog } from "../reusables/icons.js";
  import {
    MdBrightness4,
    MdBrightness5,
    MdSearch
  } from "../reusables/icons.js";
  import { currentTheme } from "../store/store.js";
  import { Colors, Themes } from "../constants";

  const { DARK, LIGHT } = Themes;

  const toggleMode = () => {
    if ($currentTheme === DARK) $currentTheme = LIGHT;
    else $currentTheme = DARK;
  };
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
  }

  .profile-view {
    font-size: 25px;
    display: flex;
    align-items: center;
  }

  .mode-icon {
    margin-left: 10px;
  }

  .icon-view {
    display: flex;
  }

  .avatar-view {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gear-icon,
  .mode-icon {
    height: 25px;
    width: 30px;
  }

  @media only screen and (max-width: 480px) {
    .name-view {
      display: none;
    }
  }
</style>

<div class="wrapper">
  <div class="profile-view">
    <span class="avatar-view" style="background: {Colors.JetStream}">J</span>
    <span class="name-view">John Doe</span>
  </div>
  <div class="icon-view">
    <span class="gear-icon">
      <FaCog />
    </span>
    <span class="mode-icon" on:click={() => toggleMode()}>
      {#if $currentTheme === DARK}
        <MdBrightness4 />
      {:else}
        <MdBrightness5 />
      {/if}
    </span>
  </div>
</div>
