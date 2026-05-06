import { computed, onMounted, ref, watch } from "vue";
import type { Todo } from "../types/todo";

export type TodoFilter = "all" | "active" | "completed";

const TODOS_STORAGE_KEY = "todo-items";

export function useTodos() {
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

  function clearCompletedTodos() {
    todos.value = todos.value.filter((todo) => !todo.completed);
  }

  onMounted(() => {
    loadStoredTodos();
  });

  watch(
    todos,
    (value) => {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(value));
    },
    { deep: true },
  );

  return {
    todoFilter,
    filteredTodos,
    activeTodoCount,
    createTodo,
    deleteTodo,
    toggleTodo,
    changeTodoFilter,
    clearCompletedTodos,
  };
}
