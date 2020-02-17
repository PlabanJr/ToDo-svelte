<script>
  export let placeholder, onChangeCB;

  let searchText = "";
</script>

<style>
  input {
    width: 100%;
    border: none;
    outline: none;
    margin: 0;
    background: transparent;
    font-size: 20px;
  }

  ::placeholder {
    color: #faf8ff;
  }
</style>

<input
  type="text"
  bind:value={searchText}
  {placeholder}
  on:input={onChangeCB(searchText)} />
