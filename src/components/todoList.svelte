<script>
  import { Todos, isSearching, searchList } from "../store/store.js";
  import { fade, fly } from "svelte/transition";
  import {
    FaListAlt,
    FaRegThumbsUp,
    FaRegThumbsDown,
    FaPencilAlt,
    FaTrashAlt,
    FaRegSadTear
  } from "../reusables/icons.js";
  import { Colors, TodoStatus } from "../constants/index.js";
  const business = "../../public/images/portfolio.svg";
  $: todoList = $isSearching ? [...$searchList] : [...$Todos];
  $: noResultText =
    $isSearching && $searchList.length === 0
      ? "No results found.."
      : "No items added yet...";

  const { DONE, ON_GOING } = TodoStatus;
  const { Scorpion, CaribbeanGreen, JetStream } = Colors;
  let currentlyUpdating = {
    id: null,
    state: false
  };

  const deleteTodo = id =>
    Todos.update(todos => todos.filter(todo => todo.id != id));

  const toggleEditView = (id, visibility) => {
    currentlyUpdating.id = id;
    currentlyUpdating.state = visibility;
  };

  const updateTodo = id => {
    const textField = document.getElementById(id + "textField");
    textField.addEventListener("keyup", e => {
      if (e.keyCode == 13) {
        Todos.update(todos => {
          const index = todos.findIndex(obj => obj.id === id);
          todos[index].updatedAt = new Date().toDateString();

          return todos;
        });

        toggleEditView(id, false);
      }
    });
  };

  const markDone = id =>
    Todos.update(todos => {
      const index = todos.findIndex(obj => obj.id === id);
      todos[index].status = DONE;

      return todos;
    });

  const markUndone = id =>
    Todos.update(todos => {
      const index = todos.findIndex(obj => obj.id === id);
      todos[index].status = ON_GOING;

      return todos;
    });
</script>

<style>
  .noResultText {
    font-size: 20px;
    text-align: center;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .noResultIcon {
    height: 40px;
    width: 40px;
    margin-bottom: 10px;
  }

  .show {
    display: block !important;
  }
  .hide {
    display: none !important;
  }

  .todo-list-wrapper {
    margin-top: 10px;
  }

  .todo-item-wrapper {
    width: 100%;
    border-radius: 30px;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }

  .upper-wrapper {
    display: flex;
    margin-bottom: 5px;
  }

  .lower-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .left-view {
    margin-right: 8px;
    width: 18%;
    height: 50px;
    display: flex;
    align-self: flex-start;
  }

  .right-view {
    display: flex;
    flex-direction: column;
    width: 75%;
  }

  .todo-header {
    font-weight: bold;
    font-size: 16px;
  }

  .todo-body {
    font-size: 14px;
    display: block;
  }

  .meta-data-wrapper {
    display: none;
  }

  .meta-data,
  .label {
    font-size: 12px;
    font-style: italic;
  }

  .label {
    margin-left: 10px;
    margin-right: 5px;
  }

  .status-button {
    width: 200px;
  }

  .status-button {
    height: 22px;
    width: 24px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 30px;
    padding: 10px;
    margin-left: 10px;
  }

  .status-button-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .edit-box {
    outline: none;
    background: #908f8f;
    border: none;
    border-bottom: 1px solid #908f8f;
    padding: 5px;
  }

  @media only screen and (min-width: 480px) {
    .meta-data-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

  @media only screen and (min-width: 1200px) {
    .meta-data-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    .todo-item-wrapper {
      padding: 15px 45px;
    }

    .left-view {
      margin-right: 20px;
      width: 8%;
    }

    .right-view {
      width: 92%;
    }

    .todo-body {
      font-size: 15px;
    }
  }
</style>

<div class="todo-list-wrapper">
  {#if todoList.length > 0}
    {#each todoList as { id, heading, tags, text, createdAt, updatedAt, status }, i}
      <div
        class="todo-item-wrapper"
        style="background: {Scorpion}"
        {id}
        in:fade
        out:fly={{ y: 500, duration: 500 }}>

        <div class="upper-wrapper">
          <div class="left-view">
            <FaListAlt />
          </div>

          <div class="right-view">
            <!-- <span class="todo-header">{heading}</span> -->
            <input
              bind:value={text}
              class="edit-box todo-body {currentlyUpdating.id === id && currentlyUpdating.state ? 'show' : 'hide'}"
              type="text"
              id={id + 'textField'}
              on:keydown={updateTodo(id)} />
            <div
              class="todo-body {currentlyUpdating.id !== id || !currentlyUpdating.state ? 'show' : 'hide'}"
              id={id + 'todoBody'}>
              {text}
            </div>
          </div>
        </div>

        <div class="lower-wrapper">
          <div class="meta-data-wrapper">
            <label class="meta-data label">Created:</label>
            <span class="meta-data">{createdAt}</span>
            <label class="meta-data label">Updated:</label>
            <span class="meta-data">{updatedAt}</span>
          </div>
          <div class="status-button-wrapper">
            <div class="status-button" on:click={toggleEditView(id, true)}>
              <FaPencilAlt />
            </div>
            <div
              class="status-button"
              style="background: rgba(255, 0, 0 , 0.6)"
              on:click={deleteTodo(id)}>
              <FaTrashAlt />
            </div>
            <div
              class="status-button"
              style="background:{status === DONE ? CaribbeanGreen : JetStream}"
              on:click={markDone(id)}>
              <FaRegThumbsUp />
            </div>
            <div
              class="status-button {status}"
              style="background:{status === ON_GOING ? CaribbeanGreen : JetStream}"
              on:click={markUndone(id)}>
              <FaRegThumbsDown />
            </div>
          </div>
        </div>

      </div>
    {/each}
  {:else}
    <div class="noResultText" in:fly={{ duration: 1000, y: 800 }}>
      <div class="noResultIcon">
        <FaRegSadTear />
      </div>
      {noResultText}
    </div>
  {/if}
</div>
