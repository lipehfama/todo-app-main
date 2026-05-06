import { onMounted, ref, watch } from "vue";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "todo-theme";

export function useTheme() {
  const theme = ref<Theme>("light");

  function applyTheme(value: Theme) {
    document.documentElement.dataset.theme = value;
  }

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
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
  });

  watch(theme, (value) => {
    applyTheme(value);
    localStorage.setItem(THEME_STORAGE_KEY, value);
  });

  return {
    theme,
    toggleTheme,
  };
}
