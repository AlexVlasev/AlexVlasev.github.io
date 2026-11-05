import { Link, Navigate, useLocation } from "react-router";

// GitHub Pages has no server-side redirects, so a migrated page's old URL lands here through 404.html.
const movedPages: Record<string, string> = {
    "/about.html": "/about",
};

export function meta() {
    return [{ title: "Page not found - Alex Vlasev" }];
}

export default function NotFound() {
    const { pathname } = useLocation();
    const newPath = movedPages[pathname];

    if (newPath) {
        return <Navigate to={newPath} replace />;
    }

    return (
        <>
            <h1>Page not found</h1>
            <p>
                This page doesn&apos;t exist, but the{" "}
                <Link to="/">home page</Link> does.
            </p>
        </>
    );
}
