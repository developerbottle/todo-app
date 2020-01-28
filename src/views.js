import {getTodos, removeTodo, toggleTodo} from "./todos";
import {getFilters} from "./filters";

const renderTodos = () => {
    const todos = getTodos();
    const { searchText, hideCompleted } = getFilters();

    const todosBlock = document.querySelector("#todos");

    todosBlock.innerHTML = "";

    const todosToDisplay = todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()) && !(hideCompleted && todo.completed));
    const incompletedTodos = todosToDisplay.filter(todo => !todo.completed);

    todosBlock.appendChild(generateSummaryDOM(incompletedTodos));

    if (todosToDisplay.length > 0) {
        todosToDisplay.forEach(todo => {
            todosBlock.appendChild(generateTodoDOM(todo));
        });
    } else {
        const messageElement = document.createElement("p");
        messageElement.classList.add("empty-message");
        messageElement.textContent = "There Are No Todos To Show";
        todosBlock.appendChild(messageElement);
    }
};

const generateTodoDOM = (todo) => {
    const todoElement = document.createElement("label");
    todoElement.classList.add("list-item");

    const containerElement = document.createElement("div");
    containerElement.classList.add("list-item__container");

    // Setup todo checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (todo.completed) {
        checkbox.checked = true;
    }
    checkbox.addEventListener("change", e => {
        toggleTodo(todo.id);
        renderTodos();
    });
    containerElement.appendChild(checkbox);

    // Setup todo text
    const span = document.createElement("span");
    span.textContent = todo.text;
    containerElement.appendChild(span);

    todoElement.appendChild(containerElement);

    // Setup todo button
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.classList.add("button", "button--text");
    removeButton.addEventListener("click", e => {
        removeTodo(todo.id);
        renderTodos();
    });
    todoElement.appendChild(removeButton);

    return todoElement;
};

const generateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement("h2");
    summary.classList.add("list-title");
    summary.textContent = `You have ${incompletedTodos.length} todo${(incompletedTodos.length !== 1)? "s" : ""} left`;

    return summary;
};

export { renderTodos, generateTodoDOM, generateSummaryDOM };