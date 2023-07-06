let todolist = [];
let value = "";
let filterMode = "all";
let mode = "all";
const root = document.querySelector(".wrapper");
const todoListContainer = document.querySelector(".todoListContainer");
const addButton = document.querySelector("#btn2");
const clearAllbtn = document.querySelector("#btnfooter");
const footerContainer = document.querySelector(".footerCounter");
const statusChangeButton = document.querySelector("#toggleBtn");

const statusContainer = document.querySelector(".controls");

root.addEventListener("click", (event) => {
  switch (true) {
    case event.target.id === "addTaskButton":
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

      break;
  }
});

root.addEventListener("change", (event) => {
  switch (true) {
    case event.target.id === "textinput":
      value = event.target.value;
  }
});

clearAllbtn.addEventListener("click", () => {});

function render() {
  todolist.forEach((todo) => {
    if (mode === todo.status || mode === "all") {
      todoListContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="todolistLeft"<ul> <li>${todo.title}  </li></ul> </div>
    <div class="todolistRight" 

    <button data-id="${todo.id}" id="toggleBtn" class="toggleStatus" type="button">
    <i id="toggleBtn" class="fa fa-check"></i></button>   


   <button data-id="${todo.id}"  id="toggleBtn" class="toggleStatus" type="button">
    <i id="toggleBtn" class="fa fa-list"></i></button></div>`
      );
    }
  });
}

statusContainer.addEventListener("click", (event) => {
  switch (true) {
    case event.target.classList.contains("ChangeModeBtn"):
      mode = event.target.dataset.mode;
      console.log(mode);
      clear();
      render();
  }
});

function clear() {
  todoListContainer.innerHTML = "";
  footerContainer.innerHTML = "";
}

function clearAll() {
  todolist.splice(0, todolist.length);
}

function updateCounter() {
  footerContainer.innerHTML = `<p>У вас ${todolist.length} задач </p>`;
}
