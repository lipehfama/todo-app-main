<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Header from "./components/Header/Header.vue";
import TodoInput from "./components/TodoInput/TodoInput.vue";
import TodoList from "./components/TodoList/TodoList.vue";
import Footer from "./components/Footer/Footer.vue";
import type { Todo } from "./types/todo";

type Theme = "light" | "dark";
type TodoFilter = "all" | "active" | "completed";

const THEME_STORAGE_KEY = "todo-theme";
const TODOS_STORAGE_KEY = "todo-items";

const theme = ref<Theme>("light");
const todoFilter = ref<TodoFilter>("all");
const todos = ref<Todo[]>([]);

const filteredTodos = computed(() => {
  if (todoFilter.value === "active") {
    return todos.value.filter((todo) => !todo.completed);
  }

  if (todoFilter.value === "completed") {
    return todos.value.filter((todo) => todo.completed);
  }

  return todos.value;
});

const activeTodoCount = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length;
});

function applyTheme(value: Theme) {
  document.documentElement.dataset.theme = value;
}

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

function isTodo(value: unknown): value is Todo {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "completed" in value &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.completed === "boolean"
  );
}

function loadStoredTodos() {
  const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

  if (!savedTodos) return;

  try {
    const parsedTodos: unknown = JSON.parse(savedTodos);

    if (Array.isArray(parsedTodos) && parsedTodos.every(isTodo)) {
      todos.value = parsedTodos;
    }
  } catch {
    localStorage.removeItem(TODOS_STORAGE_KEY);
  }
}

function createTodo(title: string) {
  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };

  todos.value.unshift(todo);
}

function deleteTodo(id: Todo["id"]) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

function toggleTodo(id: Todo["id"]) {
  const todo = todos.value.find((todo) => todo.id === id);

  if (!todo) return;

  todo.completed = !todo.completed;
}

function changeTodoFilter(filter: TodoFilter) {
  todoFilter.value = filter;
}

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  theme.value =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : prefersDark
        ? "dark"
        : "light";

  applyTheme(theme.value);
  loadStoredTodos();
});

watch(theme, (value) => {
  applyTheme(value);
  localStorage.setItem(THEME_STORAGE_KEY, value);
});

watch(
  todos,
  (value) => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(value));
  },
  { deep: true },
);
</script>

<template>
  <main class="app">
    <Header :theme="theme" @toggle-theme="toggleTheme" />

    <section class="app__content" aria-label="Todo app">
      <TodoInput @create="createTodo" />
      <TodoList
        :todos="filteredTodos"
        :active-count="activeTodoCount"
        :filter="todoFilter"
        @delete="deleteTodo"
        @toggle="toggleTodo"
        @change-filter="changeTodoFilter"
      />
      <Footer />
    </section>
  </main>
</template>
