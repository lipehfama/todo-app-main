<script setup lang="ts">
import moonIcon from "../../assets/images/icons/icon-moon.svg";
import sunIcon from "../../assets/images/icons/icon-sun.svg";

const props = defineProps<{
  theme: "light" | "dark";
}>();

const emit = defineEmits<{
  toggleTheme: [];
}>();
</script>

<template>
  <header class="header">
    <div class="header__content">
      <h1 class="header__title">TODO</h1>

      <button
        class="header__theme-button"
        type="button"
        :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`"
        @click="emit('toggleTheme')"
      >
        <img :src="props.theme === 'light' ? moonIcon : sunIcon" alt="" />
      </button>
    </div>
  </header>
</template>

<style scoped>
@import "./style.css";
</style>
