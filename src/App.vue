<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header/Header.vue";
import TodoInput from "./components/TodoInput/TodoInput.vue";
import TodoList from "./components/TodoList/TodoList.vue";
import Footer from "./components/Footer/Footer.vue";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const todos = ref<Todo[]>([
  {
    id: 1,
    title: "Complete online JavaScript course",
    completed: true,
  },
  {
    id: 2,
    title: "Jog around the park 3x",
    completed: false,
  },
  {
    id: 3,
    title: "10 minutes meditation",
    completed: false,
  },
  {
    id: 4,
    title: "Read for 1 hour",
    completed: false,
  },
  {
    id: 5,
    title: "Pick up groceries",
    completed: false,
  },
  {
    id: 6,
    title: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
]);

function createTodo(title: string) {
  todos.value.unshift({
    id: Date.now(),
    title,
    completed: false,
  });
}
</script>

<template>
  <main class="app">
    <Header />

    <section class="app__content" aria-label="Todo app">
      <TodoInput @create="createTodo" />
      <TodoList :todos="todos" />
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
