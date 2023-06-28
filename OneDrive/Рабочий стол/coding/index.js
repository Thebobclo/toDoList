const todolist = [];

let value = "";
const root = document.querySelector(".wrapper");
const todoListContainer = document.querySelector(".todoListContainer");
const addButton = document.querySelector("#btn2");
const clearAllbtn = document.querySelector("#btnfooter");
const footerContainer = document.querySelector(".footerCounter");

addButton.addEventListener("click", (event) => {
  todolist.push({
    // id: Math.random(),
    title: value,
    status: "todo",
  });

  clear();
  updateCounter();
  render();
});
root.addEventListener("change", (event) => {
  switch (true) {
    case event.target.id === "textinput":
      value = event.target.value;
  }
});

clearAllbtn.addEventListener("click", (event) => {
  clear();
  clearAll();
});

function render() {
  todolist.forEach((todo) =>
    todoListContainer.insertAdjacentHTML("beforeend", `<li>${todo.title}</li> `)
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
