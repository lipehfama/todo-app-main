<script setup lang="ts">
import type { Todo } from "../../types/todo";

type TodoFilter = "all" | "active" | "completed";

const props = defineProps<{
  todos: Todo[];
  activeCount: number;
  filter: TodoFilter;
}>();

const emit = defineEmits<{
  delete: [id: Todo["id"]];
  toggle: [id: Todo["id"]];
  changeFilter: [filter: TodoFilter];
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
          @click="emit('toggle', todo.id)"
        >
          <img
            v-if="todo.completed"
            src="../../assets/images/icons/icon-check.svg"
            alt=""
          />
        </button>

        <span class="todo-list__text">{{ todo.title }}</span>

        <button
          class="todo-list__remove"
          type="button"
          aria-label="Remove todo"
          @click="emit('delete', todo.id)"
        >
          <img src="../../assets/images/icons/icon-cross.svg" alt="" />
        </button>
      </li>
    </ul>

    <footer class="todo-list__actions">
      <span>{{ props.activeCount }} items left</span>

      <nav class="todo-list__filters" aria-label="Todo filters">
        <button
          class="todo-list__filter"
          :class="{ 'todo-list__filter--active': props.filter === 'all' }"
          type="button"
          @click="emit('changeFilter', 'all')"
        >
          All
        </button>
        <button
          class="todo-list__filter"
          :class="{ 'todo-list__filter--active': props.filter === 'active' }"
          type="button"
          @click="emit('changeFilter', 'active')"
        >
          Active
        </button>
        <button
          class="todo-list__filter"
          :class="{ 'todo-list__filter--active': props.filter === 'completed' }"
          type="button"
          @click="emit('changeFilter', 'completed')"
        >
          Completed
        </button>
      </nav>

      <button class="todo-list__clear" type="button">Clear Completed</button>
    </footer>
  </section>
</template>

<style scoped>
@import "./style.css";
</style>
