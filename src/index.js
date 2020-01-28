import { renderTodos } from "./views";
import {setFilters} from "./filters";
import {createTodo} from "./todos";

renderTodos();

document.querySelector("#filter-text").addEventListener("input", e => {
    setFilters({
        searchText: e.target.value
    });
    renderTodos();
});

document.querySelector("#hide-completed").addEventListener("change", e => {
    setFilters({
        hideCompleted: e.target.checked
    });
    renderTodos();
});

document.querySelector("#new-todo-form").addEventListener("submit", e => {
    e.preventDefault();

    const todoText = e.target.elements.todoText.value.trim();

    if (todoText.length === 0) return;

    createTodo(todoText);
    renderTodos();

    e.target.elements.todoText.value = "";
});

window.addEventListener("storage", e => {
    if (e.key === "todos") {
        renderTodos();
    }
});