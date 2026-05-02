<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header/Header.vue";
import TodoInput from "./components/TodoInput/TodoInput.vue";
import Footer from "./components/Footer/Footer.vue";

const todos = ref<string[]>([]);

function createTodo(title: string) {
  todos.value.push(title);
}
</script>

<template>
  <main class="app">
    <Header />

    <section class="app__content" aria-label="Todo app">
      <TodoInput @create="createTodo" />
    </section>

    <Footer />
  </main>
</template>

<style scoped>
.app {
  min-block-size: 100vh;
  background-color: var(--page-background);
}

.app__content {
  inline-size: min(100% - 3rem, var(--content-width));
  margin-block-start: -8.5rem;
  margin-inline: auto;

  @media (width < 48rem) {
    inline-size: min(100% - 1.5rem, var(--content-width));
    margin-block-start: -6rem;
  }
}
</style>
