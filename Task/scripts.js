document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"),
    input = form.querySelector(".form-control"),
    ul = document.querySelector(".list-group");

let tasks = [];


  const renderList = (taskText, parent) => {
    if (taskText) {
      parent.innerHTML += `
      <li class="list-group-item">
          <label class="form-check-label"><input class="form-check-input me-3" type="checkbox">${taskText}</label>
          <button class="btn btn-outline-danger deleteBtn">X</button>
      </li>
      `;
      input.value = "";
    }
  }

  const markChecked = (taskElement) => {
    taskElement.forEach((li) => {
      li.addEventListener("click", () => {
        const checkbox = li.querySelector(".form-check-input");
        if (checkbox.checked) {
          checkbox.setAttribute("checked", "true");
          li.classList.add("list-group-item-success");
        } else {
          checkbox.removeAttribute("checked");
          li.classList.remove("list-group-item-success");
        }
      })
    })
  }

  const deleteTask = (delBtns) => {
    delBtns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        tasks.splice(i, 1);
        localStorage.tasks = JSON.stringify(tasks);
      })
    })
  }

if(localStorage.tasks){
  tasks = JSON.parse(localStorage.tasks);
  console.log(tasks);
  tasks.forEach(task => {
    renderList(task, ul);
  })
  markChecked(ul.querySelectorAll(".list-group-item"));
    deleteTask(ul.querySelectorAll(".deleteBtn"));
}



  form.addEventListener("submit", (event) => {
    event.preventDefault();
    tasks.push(input.value);
    localStorage.tasks = JSON.stringify(tasks);
    renderList(input.value, ul);
    markChecked(ul.querySelectorAll(".list-group-item"));
    deleteTask(ul.querySelectorAll(".deleteBtn"));
    console.log(tasks);
  })
})
///////////////////////////////////////////////////////////////////

