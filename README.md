# cookie-project-vite

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Unsolved problems

The sections containing the checkboxes are too close together.

### Design decisions

Upon suggestion, I decided to use Vite due to it being easier to run automated tests there, and vuetify in order to make the components look nicer without needing to use much CSS.

### Suggested Improvements

Separate the Doc and Save buttons and have them placed right under the JSON preview.
Separate the checkbox sections in order to make it look nicer than it is right now.

### How much time it took
The main part of the project, which are the Vue classes, took me about 4 hours. However, as I ran into several problems while trying to set up the automated tests, that part took me 3 days. Finally, once I was suggested to use Vetur instead of Jest, which I was using previously, the automated tests were finalized in about 2 hours. Had I been given more time, I would have implemented all of the optional tasks and a way to save the configurations into a server so they could be called and loaded when initializing the page.
