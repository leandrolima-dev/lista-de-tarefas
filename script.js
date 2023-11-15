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
  const checkbox = createCheckbox();
  const taskTitleSpan = createTaskTitleSpan(taskTitle);
  const removeButton = createRemoveButton();

  checkbox.addEventListener("change", (event) => {
    const taskItem = event.target.parentElement;
    const taskTitleSpan = taskItem.querySelector("span");

    if (checkbox.checked) {
      taskTitleSpan.style.textDecoration = "line-through";
    } else {
      taskTitleSpan.style.textDecoration = "none";
    }

    updateTaskStatus(taskTitleSpan.textContent, checkbox.checked);
  });
  checkbox.checked = done;

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
  taskTitleSpan.textContent = taskTitle;
  return taskTitleSpan;
}

function createRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  return removeButton;
}

function updateTaskStatus(taskTitle, isDone) {
  tasks = tasks.map((task) => {
    if (task.title === taskTitle) {
      task.done = isDone;
    }
    return task;
  });
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
