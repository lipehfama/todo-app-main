<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Header from "./components/Header/Header.vue";
import TodoInput from "./components/TodoInput/TodoInput.vue";
import TodoList from "./components/TodoList/TodoList.vue";
import Footer from "./components/Footer/Footer.vue";
import type { Todo } from "./types/todo";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "todo-theme";
const TODOS_STORAGE_KEY = "todo-items";

const theme = ref<Theme>("light");
const defaultTodos: Todo[] = [
  {
    id: "todo-1",
    title: "Complete online JavaScript course",
    completed: true,
  },
  {
    id: "todo-2",
    title: "Jog around the park 3x",
    completed: false,
  },
  {
    id: "todo-3",
    title: "10 minutes meditation",
    completed: false,
  },
  {
    id: "todo-4",
    title: "Read for 1 hour",
    completed: false,
  },
  {
    id: "todo-5",
    title: "Pick up groceries",
    completed: false,
  },
  {
    id: "todo-6",
    title: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
];

const todos = ref<Todo[]>(defaultTodos);

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
      <TodoList :todos="todos" @delete="deleteTodo" />
      <Footer />
    </section>
  </main>
</template>

<style scoped>
.app {
  min-block-size: 100vh;
  background-color: var(--page-background);
}

.app__content {
  display: grid;
  gap: 1.5rem;
  inline-size: min(100% - 3rem, var(--content-width));
  margin-block-start: -8.5rem;
  margin-inline: auto;

  @media (width < 48rem) {
    gap: 1rem;
    inline-size: min(100% - 1.5rem, var(--content-width));
    margin-block-start: -6rem;
  }
}
</style>
