<script setup lang="ts">
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

defineProps<{
  todos: Todo[];
}>();
</script>

<template>
  <section class="todo-list" aria-label="Todo list">
    <ul class="todo-list__items">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="todo-list__item"
        :class="{ 'todo-list__item--completed': todo.completed }"
      >
        <button
          class="todo-list__check"
          type="button"
          :aria-label="todo.completed ? 'Mark todo as active' : 'Mark todo as completed'"
        >
          <img
            v-if="todo.completed"
            src="../../assets/images/icons/icon-check.svg"
            alt=""
          />
        </button>

        <span class="todo-list__text">{{ todo.title }}</span>

        <button class="todo-list__remove" type="button" aria-label="Remove todo">
          <img src="../../assets/images/icons/icon-cross.svg" alt="" />
        </button>
      </li>
    </ul>

    <footer class="todo-list__actions">
      <span>{{ todos.length }} items left</span>

      <nav class="todo-list__filters" aria-label="Todo filters">
        <button class="todo-list__filter todo-list__filter--active" type="button">
          All
        </button>
        <button class="todo-list__filter" type="button">Active</button>
        <button class="todo-list__filter" type="button">Completed</button>
      </nav>

      <button class="todo-list__clear" type="button">Clear Completed</button>
    </footer>
  </section>
</template>

<style scoped>
@import "./style.css";
</style>
