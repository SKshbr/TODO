// ----------------- Selectors ---------------------
const input = document.querySelector(".input");
const addButton = document.querySelector(".addButton");
const todoList = document.querySelector(".todo-list");
const filterList = document.querySelector(".filter-todo");

// ---------------- EventListeners ---------------

// Add List for button click
addButton.addEventListener("click", addList);

// Add list for Enter key press
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addList(event);
  }
});

// Check and Delete List
todoList.addEventListener("click", checkDelete);

// Filter Todo List
filterList.addEventListener("click", filterTodo);

// Restore previous List(if any) after reload of DOM
document.addEventListener("DOMContentLoaded", getTodoList);

// -------------------- Functions ---------------------------
function addList() {
  event.preventDefault();
  if (input.value.length > 0) {
    //creating a new div element
    const div = document.createElement("div");
    div.classList.add("list-item");
    //create a li element
    const li = document.createElement("li");
    li.innerText = input.value;
    li.classList.add("list");
    div.appendChild(li);
    // storing in the local storage
    storeLocalStorage(input.value);
    //creating a check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.innerHTML = `<i class="fas fa-check"></i>`;
    div.appendChild(checkButton);
    //creating a delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    div.appendChild(deleteButton);
    // attach the div to the <ul>
    todoList.appendChild(div);
    input.value = "";
  }
}

// Check or Delete function
function checkDelete(event) {
  const item = event.target;

  // Check TODO
  if (item.classList[0] === "check-button") {
    const check = item.parentElement;
    check.classList.toggle("completed");
  }

  //Delete TODO
  if (item.classList[0] === "delete-button") {
    const deleteList = item.parentElement;
    deleteList.classList.add("fall");
    // delete from local storage
    deleteLocalTodo(deleteList);
    //
    deleteList.addEventListener("transitionend", () => {
      deleteList.remove();
    });
  }
}

// List Filter
function filterTodo(event) {
  // selecting the children of <ul>
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Storing the list In the LocalStorage
function storeLocalStorage(todo) {
  // check whether we already have any previous list item
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Restore the Previous List (if any) after reload
function getTodoList() {
  // check whether we already have any previous list item
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //creating a new div element
    const div = document.createElement("div");
    div.classList.add("list-item");
    //create a li element
    const li = document.createElement("li");
    li.innerText = todo;
    li.classList.add("list");
    div.appendChild(li);
    //creating a check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.innerHTML = `<i class="fas fa-check"></i>`;
    div.appendChild(checkButton);
    //creating a delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    div.appendChild(deleteButton);
    // attach the div to the <ul>
    todoList.appendChild(div);
  });
}

// Delete item from local Storage
function deleteLocalTodo(todo) {
  // check whether we already have any previous list item
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const toDelete = todo.children[0].innerText;
  todos.splice(todos.indexOf(toDelete), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
