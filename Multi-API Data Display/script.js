
const outputDiv = document.getElementById("output");


function PromiseAPI1() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(data => {
            displayPosts(data.posts);
            resolve(true); 
        })
        .catch(err => reject(err));
    }, 1000);
    });
}


function PromiseAPI2() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
            resolve(true);
        })
        .catch(err => reject(err));
    }, 2000);
    });
}

function PromiseAPI3() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch("https://dummyjson.com/todos")
        .then(response => response.json())
        .then(data => {
            displayTodos(data.todos);
            resolve(true);
        })
        .catch(err => reject(err));
    }, 3000);
    });
}

//Button
function startPromiseChain() {
    outputDiv.innerHTML = ""; 

    PromiseAPI1()
    .then(result1 => {
        if (result1) {
        return PromiseAPI2(); 
        }
    })
    .then(result2 => {
        if (result2) {
        return PromiseAPI3();
        }
    })
    .then(() => {
        console.log("All APIs loaded successfully");
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


// Array Display
function displayPosts(posts) {
    let html = `<h2>Posts</h2>
    <table>
    <tr>
        <th>ID</th>
        <th>Title</th>
    </tr>`;

    posts.forEach(post => {
    html += `
        <tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
        </tr>`;
    });

    html += `</table>`;
    outputDiv.innerHTML += html;
}

function displayProducts(products) {
    let html = `<h2>Products</h2>
    <table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
    </tr>`;

    products.forEach(product => {
    html += `
        <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        </tr>`;
    });

    html += `</table>`;
    outputDiv.innerHTML += html;
}

function displayTodos(todos) {
    let html = `<h2>Todos</h2>
    <table>
    <tr>
        <th>ID</th>
        <th>Task</th>
        <th>Status</th>
    </tr>`;

    todos.forEach(todo => {
    html += `
        <tr>
        <td>${todo.id}</td>
        <td>${todo.todo}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        </tr>`;
    });

    html += `</table>`;
    outputDiv.innerHTML += html;
}
