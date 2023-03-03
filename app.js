const todoApp = document.querySelector(".todo__app");
const card = document.querySelector(".card");
const form = document.querySelector(".todo__form");
const input = form.querySelector("input[type=text]");
const submit = form.querySelector("input[type=submit]");
const todoAddDelete = document.querySelector(".todo__add-delete");
const todoList = document.querySelector(".todo__list");
form.addEventListener("submit", (eve) => {
  eve.preventDefault();
  let inputValue = input.value;
  addingItem(inputValue);
  storingDataOnLocalStorage();
  input.value = "";
});

// Adding item ==========================
function addingItem(inputValue) {
  let list = document.createElement("li");
  list.appendChild(document.createTextNode(inputValue));
  list.innerHTML = `
    <span> ${inputValue}</span>
    <span><i class="fa-solid fa-trash"></i></span>
  `;
  todoList.appendChild(list);
  const deleteBtn = document.querySelectorAll("i");
  deleteBtn.forEach((item) => {
    item.addEventListener("click", (eve) => {
      let deleteData = eve.target.parentElement.parentElement;
      deleteData.style.display = "none";
      successAndDangerBtn("Removed Successfully", "delete");

      const localStorageArr = JSON.parse(localStorage.getItem("todoList"));
      // console.log(localStorageArr);
      const data = localStorageArr.filter((item) => {
        return (
          item !==
          eve.target.parentElement.parentElement.children[0].textContent.trim()
        );
      });
      localStorage.setItem("todoList", JSON.stringify(data));
    });
  });
}
// function removeItem() {

// }
submit.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please Type Your Todo !");
  } else {
    successAndDangerBtn("Added Successfully", "show");
  }
});
submit.addEventListener("click", () => {});
// success and danger button adding ==========
function successAndDangerBtn(text, className) {
  todoAddDelete.classList.add(className);
  todoAddDelete.innerHTML = text;
  setTimeout(() => {
    todoAddDelete.innerHTML = "";
    todoAddDelete.classList.remove(className);
  }, 500);
}
// Storing Data On LocalStorage ==============
function storingDataOnLocalStorage() {
  let list = document.querySelectorAll("ul li");
  let arr = [];
  list.forEach((item) => {
    arr.push(item.children[0].textContent.trim());
  });
  localStorage.setItem("todoList", JSON.stringify(arr));
}

// Working With Local Storage Data ===========
window.addEventListener("DOMContentLoaded", loadTodo);
function loadTodo() {
  JSON.parse(localStorage.getItem("todoList")).map((todo) => {
    addingItem(todo);
  });
}
