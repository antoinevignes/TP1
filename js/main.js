// const tasks = [
//   {
//     title: "Apprendre mon cours de JavaScript",
//     priority: 1,
//   },
//   {
//     title: "Créer mon compte Github",
//     priority: 2,
//   },
//   {
//     title: "Répondre à mes emails",
//     priority: 3,
//   },
// ];

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// Trier liste

function sortArray(arr) {
  arr.sort((a, b) => a.priority - b.priority);
}

// Afficher liste

const list = document.querySelector("#list");

function displayList(arr) {
  list.innerHTML = "";

  const priorityClasses = ["high", "normal", "low"];

  sortArray(arr);

  arr.forEach((item, index) => {
    const listEl = document.createElement("li");

    listEl.className = priorityClasses[item.priority - 1];

    listEl.innerHTML = `
    <label>
      <input type="checkbox" data-index="${index}">
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
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.querySelector('input[type="text"]').value = "";
});

// Supprimer les taches

const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  const selectedIndexes = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedIndexes.push(parseInt(checkbox.dataset.index));
    }
  });

  tasks.splice(
    0,
    tasks.length,
    ...tasks.filter((_, index) => !selectedIndexes.includes(index))
  );

  const message = document.querySelector("#delete-msg");

  if (selectedIndexes.length === 1) {
    message.innerHTML = `La tâche a été supprimée avec succès.`;
  } else {
    message.innerHTML = `${selectedIndexes.length} tâches supprimées avec succès.`;
  }

  displayList(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
