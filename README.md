# Todo App

### Screenshots

<table>
  <tr>
    <td>Mobile Light</td>
    <td>Mobile Dark</td>
  </tr>
  <tr valign="top">
    <td><img height="630" src="https://github.com/user-attachments/assets/mobile-light-screenshot" alt="Todo app mobile light theme" /></td>
    <td><img height="630" src="https://github.com/user-attachments/assets/mobile-dark-screenshot" alt="Todo app mobile dark theme" /></td>
  </tr>
  <tr>
    <td>Desktop Light</td>
    <td>Desktop Dark</td>
  </tr>
  <tr valign="top">
    <td><img height="430" src="https://github.com/user-attachments/assets/desktop-light-screenshot" alt="Todo app desktop light theme" /></td>
    <td><img height="430" src="https://github.com/user-attachments/assets/desktop-dark-screenshot" alt="Todo app desktop dark theme" /></td>
  </tr>
</table>

## :rocket: Run Project

```bash
pnpm install
pnpm dev
```

Build and preview the production version:

```bash
pnpm build
pnpm preview
```

## :wrench: Technologies Used

![Vue](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

## :book: Project Information

This is a solution for the [Frontend Mentor Todo App challenge](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). The goal is to build a responsive todo application with task management, filtering, theme switching, local persistence, and PWA support.

The app includes:

- Create new todos
- Delete individual todos
- Mark todos as completed or active
- Filter todos by `All`, `Active`, and `Completed`
- Clear all completed todos
- Active todo counter
- Light and dark themes
- Theme persistence with `localStorage`
- Todo persistence with `localStorage`
- PWA manifest and service worker configuration through Vite
- Responsive layout for mobile and desktop
- Modern CSS with custom properties, logical properties, `clamp()`, and native CSS nesting

## :building_construction: Architecture

```txt
src/
  App.vue
  main.ts

  components/
    Header/
    TodoInput/
    TodoList/
    Footer/

  composables/
    useTheme.ts
    useTodos.ts

  types/
    todo.ts

  assets/
    styles/
      variables.css
      global.css
      main.css
```

The project keeps UI and logic separated:

- `App.vue` coordinates the page and connects events to composables.
- `useTodos.ts` owns todo state, filtering, CRUD actions, and todo persistence.
- `useTheme.ts` owns theme state, theme persistence, and `data-theme` updates.
- Components receive props and emit events instead of mutating global state directly.

The main flow is:

```txt
TodoInput emits create
  App.vue calls createTodo from useTodos
    useTodos updates todos and localStorage

TodoList emits toggle/delete/filter/clearCompleted
  App.vue calls the matching useTodos function
    computed values update the rendered list

Header emits toggleTheme
  App.vue calls toggleTheme from useTheme
    useTheme updates data-theme and localStorage
```

## :memo: Semantic Structure

The UI is structured around meaningful HTML:

- `main.app` wraps the application.
- `header.header` contains the title and theme toggle.
- `section.app__content` groups the todo experience.
- `form.todo-input` handles task creation.
- `section.todo-list` identifies the todo list region.
- `ul` and `li` represent the list of tasks.
- `footer.todo-list__actions` groups counter, filters, and clear action.
- Buttons include accessible labels for icon-only actions.

More notes are available in [What We Learned](./docs/what-we-learned.md).

## :iphone: PWA

The project uses `vite-plugin-pwa` to generate the app manifest and service worker.

PWA assets live in `public/`:

```txt
public/
  favicon-32x32.png
  icon-192x192.png
  icon-512x512.png
  robots.txt
```

To inspect the PWA behavior, run a production preview:

```bash
pnpm build
pnpm preview
```

Then open Chrome DevTools and check:

- Application > Manifest
- Application > Service Workers
- Lighthouse > PWA

## :link: Useful Links

- [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW)
- [Vite PWA Documentation](https://vite-pwa-org.netlify.app/)
- [Vue Documentation](https://vuejs.org/)
- [Vite Documentation](https://vite.dev/)

## :bulb: Author

Lipeh Fama

<p><a href="https://www.frontendmentor.io/profile/FelipeFama">Frontend Mentor Profile</a></p>
<p><a href="https://github.com/FelipeFama">GitHub</a></p>
