# avlasev.com

Personal website of Alexander Vlasev, live at [www.avlasev.com](https://www.avlasev.com). It's built with React, React Router and TypeScript, and pre-rendered to static files. Pushing to `master` deploys it to GitHub Pages.

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

- `app/routes.ts` lists the site's pages, and `app/routes/` holds their route files.
- `app/content/` holds page content as MDX, which is Markdown with math and React components.
- `app/components/` and `app/demos/` hold the shared components and the p5 sketches.
- `app/assets/` holds images, which are imported from the pages that use them.
- `app/navigation.ts` defines the nav menu and social links.
- `public/` holds files served as they are.

## Adding a page

1. Add an MDX file under `app/content/`, with a `title` and `description` in its frontmatter.
2. Add a route file under `app/routes/` that renders it, and list it in `app/routes.ts`.
3. Add it to `app/navigation.ts` if it belongs in the nav menu.

If a page's URL changes, add the old URL to the table in `app/routes/not-found.tsx` so old links keep working.
