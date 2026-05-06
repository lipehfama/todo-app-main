<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import TodoInput from "./components/TodoInput/TodoInput.vue";
import TodoList from "./components/TodoList/TodoList.vue";
import Footer from "./components/Footer/Footer.vue";
import { useTheme } from "./composables/useTheme";
import { useTodos } from "./composables/useTodos";

const { theme, toggleTheme } = useTheme();
const {
  todoFilter,
  filteredTodos,
  activeTodoCount,
  createTodo,
  deleteTodo,
  toggleTodo,
  changeTodoFilter,
  clearCompletedTodos,
} = useTodos();
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
        @clear-completed="clearCompletedTodos"
      />
      <Footer />
    </section>
  </main>
</template>
