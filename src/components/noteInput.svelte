<script>
  import { Colors, TodoStatus } from "../constants";
  import { IoMdCheckmark, MdClose } from "../reusables/icons.js";
  import { Todos } from "../store/store.js";
  import { generateId } from "../utils";

  let value = "";

  const addToList = () => {
    const todoBody = value.trimStart();

    if (!todoBody.length) return;

    const currentDate = new Date().toDateString();
    const newTodo = {
      id: generateId(),
      heading: "Todo",
      tags: ["#one"],
      text: todoBody.trimEnd(),
      createdAt: currentDate,
      updatedAt: currentDate,
      status: TodoStatus.ON_GOING
    };

    Todos.update(todos => [newTodo, ...todos]);
    value = "";
  };

  const clearTextArea = () => {
    value = "";
  };

  const checkKeyVal = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      addToList();
    }
  };
</script>

<style>
  textarea {
    width: 100%;
    height: 100px;
    padding: 35px 45px;
    box-sizing: border-box;
    border-radius: 30px;
    resize: none;
    outline: none;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    border: none;
  }

  textarea::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  .cta-view {
    position: absolute;
    width: 30px;
    top: 15px;
    right: 15px;
  }

  .cta-buttons {
    width: 30px;
    height: 30px;
    background: #c1c1c1;
    border-radius: 20px;
    padding: 2px;
    cursor: pointer;
  }

  .note-input-wrapper {
    position: relative;
  }

  textarea::-webkit-scrollbar {
    width: 0 !important;
  }
</style>

<div class="note-input-wrapper">
  <textarea
    style="background: {Colors.DoveGray}"
    placeholder="Write a note or paste a link"
    bind:value
    id="noteInput"
    on:keyup={checkKeyVal} />
  <div class="cta-view">
    <div class="cta-buttons" on:click={addToList}>
      <IoMdCheckmark />
    </div>
    <div class="cta-buttons" style="margin-top: 5px" on:click={clearTextArea}>
      <MdClose />
    </div>
  </div>
</div>
