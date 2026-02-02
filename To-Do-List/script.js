// ====== DOM ELEMENTS ======
const taskInput = document.querySelector(".task_detail");
const dateInput = document.querySelector(".date");
const prioritySelect = document.getElementById("priority");
const addBtn = document.getElementById("main_btn");

const todayContainer = document.querySelector(".Today_box_container1");
const futureContainer = document.querySelector(".Today_box_container2");
const completedContainer = document.querySelector(".Today_box_container3");

// ====== LOCAL STORAGE HELPERS ======
function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ====== DATE HELPERS ======
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
}

// ====== ADD TODO ======
addBtn.addEventListener("click", () => {
    const name = taskInput.value.trim();
    const date = dateInput.value;
    const priority = prioritySelect.value;

    if (!name || !date || priority === "Priority") {
        alert("Please fill all fields");
        return;
    }

    const newTodo = {
        id: Date.now(),
        name,
        date,
        priority,
        completed: false
    };

    const todos = getTodos();
    todos.push(newTodo);
    saveTodos(todos);

    taskInput.value = "";
    dateInput.value = "";
    prioritySelect.selectedIndex = 0;

    renderTodos();
});

// ====== DELETE TODO ======
function deleteTodo(id) {
    let todos = getTodos();
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);
    renderTodos();
}

// ====== TOGGLE COMPLETE ======
function toggleComplete(id) {
    const todos = getTodos();
    todos.forEach(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
    });
    saveTodos(todos);
    renderTodos();
}

// ====== CREATE TODO CARD ======
function createTodoElement(todo, isDark = false) {
    const div = document.createElement("div");
    div.className = isDark ? "box_body1" : "box_body2";

    div.innerHTML = `
        <div class="body_item1">${todo.name}</div>
        <div>${todo.date}</div>
        <div>${todo.priority}</div>
        <div class="body_item3">
            <button onclick="toggleComplete(${todo.id})">✔</button>
            <button onclick="deleteTodo(${todo.id})">🗑</button>
        </div>
    `;

    return div;
}

// ====== RENDER TODOS ======
function renderTodos() {
    todayContainer.innerHTML = "";
    futureContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    const todos = getTodos();
    const todayDate = getTodayDate();

    todos.forEach(todo => {
        if (todo.completed) {
            completedContainer.appendChild(createTodoElement(todo));
        } else if (todo.date === todayDate) {
            todayContainer.appendChild(createTodoElement(todo, true));
        } else {
            futureContainer.appendChild(createTodoElement(todo));
        }
    });
}

// ====== INITIAL LOAD ======
renderTodos();
