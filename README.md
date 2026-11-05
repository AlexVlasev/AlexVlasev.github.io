# avlasev.com

Personal website of Alexander Vlasev, live at [www.avlasev.com](https://www.avlasev.com). It's built with React, React Router and TypeScript, and pre-rendered to static files for GitHub Pages.

The site is being migrated from its original static HTML, one page at a time. Until that's finished, old pages are served unchanged from `public/`, and the files that generated them are kept in `legacy/`.

## Development

Requires Node 26 (see `.node-version`).

```sh
npm install
npm run dev
```

| Command                | What it does                                 |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Starts the dev server with live reload       |
| `npm run build`        | Builds the static site into `build/client`   |
| `npm run typecheck`    | Generates route types and runs the compiler  |
| `npm run lint`         | Checks the code with ESLint                  |
| `npm run format`       | Formats the code with Prettier               |
| `npm run format:check` | Checks formatting without changing any files |

To preview a production build:

```sh
npm run build
python3 -m http.server -d build/client
```

## Layout

- `app/` holds the React app: routes, components and styles.
- `public/` holds files served as they are, including the old pages.
- `legacy/` holds the old site's generator and source content.
