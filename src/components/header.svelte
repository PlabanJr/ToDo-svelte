<script>
  import { FaFilter } from "../reusables/icons.js";
  import {
    MdBrightness4,
    MdBrightness5,
    MdSearch
  } from "../reusables/icons.js";
  import { currentTheme, CurrentFilter } from "../store/store.js";
  import { Colors, Themes, TodoStatus } from "../constants";

  const { DARK, LIGHT } = Themes;
  let isFilterHidden = true;

  const toggleMode = () => {
    if ($currentTheme === DARK) $currentTheme = LIGHT;
    else $currentTheme = DARK;
  };

  const toggleFilter = () => {
    isFilterHidden = !isFilterHidden;
    CurrentFilter.update(() => "");
  };

  const setFilter = filter => {
    CurrentFilter.update(() => filter);
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
    cursor: pointer;
  }

  .gear-icon {
    position: relative;
    height: 20px;
  }

  .filters {
    position: absolute;
    background: #444040;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: max-content;
    border-radius: 10px;
    right: -35px;
  }

  .filter-item {
    padding: 10px;
  }

  .filter-item:hover {
    color: #908f8f;
    cursor: pointer;
  }

  .filter-item:first-child {
    border-bottom: 1px solid;
  }

  .hide {
    display: none;
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
      <span on:click={toggleFilter}>
        <FaFilter />
      </span>
      <div class="filters" class:hide={isFilterHidden}>
        <span class="filter-item" on:click={() => setFilter('done')}>
          Completed
        </span>
        <span class="filter-item" on:click={() => setFilter('undone')}>
          In Progress
        </span>
      </div>
    </span>
    <span class="mode-icon" on:click={toggleMode}>
      {#if $currentTheme === DARK}
        <MdBrightness4 />
      {:else}
        <MdBrightness5 />
      {/if}
    </span>
  </div>
</div>
