let todolist = [];
let value = "";
const root = document.querySelector(".wrapper");
const todoListContainer = document.querySelector(".todoListContainer");
const addButton = document.querySelector("#btn2");
const clearAllbtn = document.querySelector("#btnfooter");
const footerContainer = document.querySelector(".footerCounter");

addButton.addEventListener("click", (event) => {
  switch (true) {
    case event.target.className === "fas fa-plus":
      todolist.push({
        id: Math.random(),
        title: value,
        status: "todo",
      });
      clear();
      updateCounter();
      render();
    case event.target.classlist.contains ("toggleStatus"):
      objtoChange = todolist.find((todo) => todo.id === event.target.dataset.id);
      console.log(event.target.dataset);
      objtoChange.status = objtoChange.status === "todo" ? "done" : "todo";
  }
});

root.addEventListener("change", (event) => {
  switch (true) {
    case event.target.id === "textinput":
      value = event.target.value;
    // case event.target.classlist.contains("toggleStatus"):
    //   objtochange = todolist.find((todo) => todo.id === event.target.dataset.id);
    //   console.log(event.target.dataset)
    //   objtochange.status = objtochange.status === "todo" ? "done" : "todo";
  }
});

clearAllbtn.addEventListener("click", (event) => {
  clear();
  clearAll();
});

function render() {
  todolist.forEach((todo) =>
    todoListContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="todolistLeft"<ul> <li>${todo.title}</li></ul> </div>
    <div class="todolistRight" 
    <button  data-id="${todo.id}" class="toggleStatus" type="button">
    <i class="fa fa-check"></i></button>   
   <button   data-id="${todo.id}" class="toggleStatus" type="button">
    <i class="fa fa-list"></i></button>   </div>`
    )
  );
}

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
