<script>
  import InputBox from "../reusables/inputBox.svelte";
  import { Colors, Themes } from "../constants";
  import { MdSearch } from "../reusables/icons.js";
  import { Todos, isSearching, searchList } from "../store/store.js";

  let screenWidth;
  const updateScreenSize = () => {
    screenWidth = window.innerWidth;
  };

  const handleSearch = searchText => {
    $isSearching = !!searchText;

    const searchResults = $Todos.filter(
      todo =>
        searchText && todo.text.toLowerCase().includes(searchText.toLowerCase())
    );

    searchList.update(list => [...searchResults]);
  };

  window.addEventListener("resize", updateScreenSize);
  window.onload = updateScreenSize();
</script>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .search-icon {
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
    .search-icon {
      display: none;
    }
  }
</style>

<header
  style="background: {Colors.Scorpion}; padding: 20px {screenWidth * 0.2}px">
  <div class="search-icon">
    <MdSearch />
  </div>
  <InputBox placeholder="Search anything...." onChangeCB={handleSearch} />

</header>
