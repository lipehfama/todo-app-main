<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  create: [title: string];
}>();

const title = ref("");

function handleSubmit() {
  const todoTitle = title.value.trim();

  if (!todoTitle) return;

  emit("create", todoTitle);
  title.value = "";
}
</script>

<template>
  <form class="todo-input" @submit.prevent="handleSubmit">
    <button
      class="todo-input__submit"
      type="submit"
      aria-label="Create new todo"
    ></button>

    <input
      v-model="title"
      class="todo-input__field"
      type="text"
      placeholder="Create a new todo..."
      aria-label="Create a new todo"
    />
  </form>
</template>

<style scoped>
@import "./style.css";
</style>
