let TODOS = [
  {
    id: Math.random(),
    title: "",
    description: "",
    startdate: new Date(1995, 11, 17),
    enddate: new Date(2000, 11, 17),
    priority: "",
    relatedTasks: [],
  },
];
function addnewTask(newTodo) {
  newTodo.id = Math.random(),
  TODOS.push(newTodo);
}
function deleteTask(id) {
  TODOS = TODOS.filter((todo) => id !== todo.id);
}
function updateTask(newOptions, id) {
  TODOS = TODOS.map((todo) => {
    if (todo.id === id) {
      return { ...todo, ...newOptions };
    }
    return todo;
  });
}

//создать метод который переносит из TODOS[] в CompliteTODOS
//метод котолрый ищет TODO по имени
function seachName(TODOS){
  TODOS.find(elm => elm.title === "string")

}

