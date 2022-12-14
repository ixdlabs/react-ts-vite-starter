# React TypeScript template with Vite

This is a [React](https://reactjs.org) + [TypeScript](https://www.typescriptlang.org/) boilerplate built with [Vite](https://vitejs.dev).

## What's inside?

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- [Cypress](https://www.cypress.io)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Polyfills](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#readme)

- [Axios](https://github.com/axios/axios)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/v4)
- [React Router Dom](https://reactrouter.com/)

## Getting started

1. Create the project.

   ```bash
   npx degit ixdlabs/react-ts-vite-starter <app-name>
   ```

2. Access the project directory.

   ```bash
   cd <my-app>
   ```

3. Initialize a git repository.

   ```bash
   git init
   ```

4. Install dependencies.

   ```bash
   yarn
   ```

5. Start dev server with hot reload at http://localhost:3000.
   ```bash
   yarn dev
   ```

## Handling Environment varialbes

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

Only VITE_SOME_KEY will be exposed as import.meta.env.VITE_SOME_KEY to your client source code, but DB_PASSWORD will not.

```
console.log(import.meta.env.VITE_SOME_KEY) // 123
console.log(import.meta.env.DB_PASSWORD) // undefined
```

More information on [Vite Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html).

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Other commands

### Lint commands

```bash
yarn lint
```

### Build commands

```bash
yarn build
```

### Run the app in production mode at http://localhost:3000.

```bash
yarn serve
```

### Test commands

- Run unit tests and watch
  ```bash
  yarn test:unit
  ```
- Run unit tests with coverage
  ```bash
  yarn test:unit:coverage
  ```
- Run e2e tests
  ```bash
  yarn test:e2e
  ```

### Commit commands

```
yarn commit
```

## License

This project is licensed under the MIT License.
