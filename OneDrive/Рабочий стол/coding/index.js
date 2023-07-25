let todolist = [];
let value = "";
let filterMode = "all";
let selectedTask = null;
let mode = "all";
let pagination = {
  pageAmount: 1,
  currentPage: 1,
  itemsinPage: 5,
  pageContainer: document.querySelector(".paginationNumber"),
};
const root = document.querySelector(".wrapper");
const todoListContainer = document.querySelector(".todoListContainer");
const addButton = document.querySelector("#addTaskButton");
const clearAllbtn = document.querySelector("#btnfooter");
const footerContainer = document.querySelector(".footerCounter");
const statusChangeButton = document.querySelector("#toggleBtn");
const statusContainer = document.querySelector(".controls");
const editButton = document.querySelector(".editButton");
const paginationLeft = document.querySelector(".paginationLeft");
const paginationRight = document.querySelector(".paginationRight");
const paginationContainer = document.querySelector(".paginationContainer");

root.addEventListener("click", (event) => {
  switch (true) {
    case event.target.id === "addTaskButton":
      if (selectedTask) {
        selectedTask.title = value;
        clear();
        updateCounter();
        render();
        return;
      }
      todolist.push({
        id: String(Math.random()),
        title: value,
        status: "todo",
      });
      clear();
      updateCounter();
      render();
      break;
    case event.target.classList.contains("toggleStatus"):
      objtoChange = todolist.find(
        (todo) => todo.id === event.target.dataset.id
      );
      objtoChange.status = objtoChange.status === "todo" ? "done" : "todo";
      break;
    case event.target.id === "btnfooter":
      clear();
      clearAll();
      clearPaginationContainer();
      break;
  }
});

root.addEventListener("change", (event) => {
  switch (true) {
    case event.target.id === "textinput":
      value = event.target.value;
  }
});

todoListContainer.addEventListener("click", (event) => {
  switch (true) {
    case event.target.classList.contains("editButton"):
      if (selectedTask?.id === event.target.dataset.id) {
        addButton.innerHTML = '<i class="fas fa-plus" id="addTaskButton"></i> ';
        selectedTask = null;
        clear();
        updateCounter();
        render();
        return;
      }

      addButton.innerHTML = '<i class="fas fa-pen" id="addTaskButton"></i> ';
      selectedTask = null;
      clear();
      updateCounter();
      render();
      selectedTask = todolist.find(
        (todo) => todo.id === event.target.dataset.id
      );
  }
  clear();
  updateCounter();
  render();
});

clearAllbtn.addEventListener("click", () => {});

paginationContainer.addEventListener("click", (event) => {
  switch (true) {
    case event.target.id === "paginationLeft":
      if (pagination.currentPage > 1) {
        pagination.currentPage--;
        pagination.pageContainer.innerText = pagination.currentPage;
      }
      clear();
      updateCounter();
      render();
    case event.target.id === "paginationRight":
      if (pagination.currentPage < pagination.pageAmount) {
        pagination.currentPage++;
        pagination.pageContainer.innerText = pagination.currentPage;
      }
      clear();
      updateCounter();
      render();
  }
});

function render() {
  const prepereTodo = todolist.filter(
    (todo) => mode === todo.status || mode === "all"
  );
  clearPaginationContainer(prepereTodo);
  pagination.pageAmount = Math.ceil(prepereTodo.length / 5);
  let renderRange = {
    start:
      pagination.currentPage === 1
        ? 0
        : pagination.currentPage * pagination.itemsinPage -
          pagination.itemsinPage,
    fin: pagination.currentPage * pagination.itemsinPage - 1,
  };

  prepereTodo.forEach((todo, index) => {
    if (index >= renderRange.start && index <= renderRange.fin) {
      todoListContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="todolistLeft" <ul> 
        <li class="toggleText ${
          todo.id === selectedTask?.id ? "active" : ""
        }">${todo.title}  </li></ul> </div>

    <div class="todolistRight" 
    <button data-id="${
      todo.id
    }" id="toggleBtn" class="toggleStatus" type="button">
    </button>   
    <input data-id="${todo.id}" ${
          todo.status === "done" ? "checked" : ""
        } type="checkbox" class="toggleStatus"></input>
<button data-id="${todo.id}" class="editButton">${
          todo.id === selectedTask?.id ? "выйти" : "правка"
        }</button>`
      );
    }
  });
}

statusContainer.addEventListener("click", (event) => {
  switch (true) {
    case event.target.classList.contains("ChangeModeBtn"):
      mode = event.target.dataset.mode;
      clear();
      clearAll();
      clearPaginationContainer();
      render();
  }
});

function clear() {
  todoListContainer.innerHTML = "";
  footerContainer.innerHTML = "";
}

function clearAll() {
  todolist.splice(0, todolist.length);
  pagination.pageContainer.innerText = pagination.currentPage = 1;
}

function updateCounter() {
  footerContainer.innerHTML = `<p>У вас ${todolist.length} задач </p>`;
}

function clearPaginationContainer(prepereTodo) {
  if (prepereTodo?.length) {
    paginationContainer.classList.remove("hidden");
  } else {
    paginationContainer.classList.add("hidden");
  }
}
render();
