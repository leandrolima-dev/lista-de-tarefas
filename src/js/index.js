
// ** O código do projeto abaixo foi refatorado e renomeado para script.js. **


// const form = document.querySelector("#todo-form");
// const taskTitleInput = document.querySelector("#task-title-input");
// const taskList = document.querySelector("#task-list");

// let tasks = [];

// window.onload = () => {
//   const tasksSavedLocalStorage = localStorage.getItem("tasks");
//   if (tasksSavedLocalStorage) {
//     tasks = JSON.parse(tasksSavedLocalStorage);
//     tasks.forEach((task) => {
//       renderTasksOnHTML(task.title, task.done);
//     });
//   }
// };
// function renderTasksOnHTML(taskTitle, done = false) {
//   const liTask = document.createElement("li");

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.addEventListener("change", (event) => {
//     liToToggle = event.target.parentElement;

//     const titleToToggle = liToToggle.querySelector("span");

//     if (checkbox.checked) {
//       titleToToggle.style.textDecoration = "line-through";
//     } else {
//       titleToToggle.style.textDecoration = "none";
//     }
//     tasks = tasks.map((task) => {
//       if (task.title === titleToToggle.textContent) {
//         task.done = checkbox.checked;
//       }
//       return task;
//     });
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   });
//   checkbox.checked = done;

//   const span = document.createElement("span");
//   span.textContent = taskTitle;

//   const button = document.createElement("button");
//   button.textContent = "Remover";
//   button.addEventListener("click", (event) => {
//     liToRemove = event.target.parentElement;

//     const titleToRemove = liToRemove.querySelector("span").textContent;

//     tasks = tasks.filter((task) => task.title !== titleToRemove);

//     taskList.removeChild(liToRemove);

//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   });

//   liTask.appendChild(checkbox);
//   liTask.appendChild(span);
//   liTask.appendChild(button);

//   taskList.appendChild(liTask);
// }

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const taskTitle = taskTitleInput.value;

//   if (taskTitle.length < 3) {
//     alert("O título da tarefa deve ter no mínimo 3 caracteres!");
//     return;
//   }
//   tasks.push({
//     title: taskTitle,
//     done: false,
//   });
//   localStorage.setItem("tasks", JSON.stringify(tasks));

//   renderTasksOnHTML(taskTitle);

//   taskTitleInput.value = "";
// });
