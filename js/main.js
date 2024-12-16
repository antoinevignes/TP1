const tasks = [
  {
    title: "Apprendre mon cours de JavaScript",
    priority: 1,
  },
  {
    title: "Créer mon compte Github",
    priority: 2,
  },
  {
    title: "Répondre à mes emails",
    priority: 3,
  },
];

// Afficher liste

const list = document.querySelector("#list");

function displayList(arr) {
  list.innerHTML = "";
  const priorityClasses = ["high", "normal", "low"];

  arr.forEach((item) => {
    const listEl = document.createElement("li");

    listEl.className = priorityClasses[item.priority - 1];

    listEl.innerHTML = `
    <label>
      <input type="checkbox">
      ${item.title}
    </label>
    `;

    list.appendChild(listEl);
  });
}

displayList(tasks);

// Ajouter un element

const taskForm = document.querySelector("#task-form");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);

  const task = {
    title: formData.get("task"),
    priority: formData.get("priority"),
  };

  tasks.push(task);
  displayList(tasks);
});
