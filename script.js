const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const taskList = document.querySelector("#task-list");
const localStorageKey = "tasks";
let tasks = [];

window.onload = () => {
  const tasksSavedLocalStorage = localStorage.getItem(localStorageKey);
  if (tasksSavedLocalStorage) {
    tasks = JSON.parse(tasksSavedLocalStorage);
    tasks.forEach((task) => {
      renderTasksOnHTML(task.title, task.done);
    });
  }
};

function renderTasksOnHTML(taskTitle, done = false) {
  const taskItem = createTaskItem(taskTitle, done);
  taskList.appendChild(taskItem);
  saveTasksToLocalStorage();
}

function createTaskItem(taskTitle, done = false) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("list-group-item", "bg-transparent", "text-white-50", "d-flex", "align-items-center", "justify-content-between");
  const checkbox = createCheckbox();
  const taskTitleSpan = createTaskTitleSpan(taskTitle);
  const removeButton = createRemoveButton();

  checkbox.addEventListener("change", (event) => {
    const taskItem = event.target.parentElement;
    const taskTitleSpan = taskItem.querySelector("span");

    taskTitleSpan.style.textDecoration = checkbox.checked
      ? "line-through"
      : "none";

    updateTaskStatus(taskTitleSpan.textContent, checkbox.checked);
  });
  checkbox.checked = done;

  if (done) taskTitleSpan.style.textDecoration = "line-through";

  removeButton.addEventListener("click", (event) => {
    const taskItem = event.target.parentElement;
    const taskTitle = taskItem.querySelector("span").textContent;

    removeTaskFromList(taskTitle);
    taskList.removeChild(taskItem);
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTitleSpan);
  taskItem.appendChild(removeButton);

  return taskItem;
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  return checkbox;
}

function createTaskTitleSpan(taskTitle) {
  const taskTitleSpan = document.createElement("span");
  taskTitleSpan.classList.add("text-align-start", "w-75", "ml-3");
  taskTitleSpan.textContent = taskTitle;
  return taskTitleSpan;
}

function createRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-danger", "btn-sm");
  removeButton.textContent = "Remover";
  return removeButton;
}

function updateTaskStatus(taskTitle, isDone) {
  tasks = tasks.map((task) =>
    task.title === taskTitle ? { ...task, done: isDone } : task
  );
  saveTasksToLocalStorage();
}

function removeTaskFromList(taskTitle) {
  tasks = tasks.filter((task) => task.title !== taskTitle);
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("O título da tarefa deve ter no mínimo 3 caracteres!");
    return;
  }

  tasks.push({
    title: taskTitle,
    done: false,
  });

  saveTasksToLocalStorage();
  renderTasksOnHTML(taskTitle);

  taskTitleInput.value = "";
});
