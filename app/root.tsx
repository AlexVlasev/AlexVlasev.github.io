import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import { themeInitScript } from "~/theme";

import type { Route } from "./+types/root";

import "~/styles/global.css";

export const links: Route.LinksFunction = () => [
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        // The init script can change data-theme before React hydrates.
        <html lang="en" data-theme="dark" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const notFound = isRouteErrorResponse(error) && error.status === 404;

    return (
        <main>
            <h1>{notFound ? "Page not found" : "Something went wrong"}</h1>
        </main>
    );
}
