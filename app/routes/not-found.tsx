import { Link, Navigate, useLocation } from "react-router";

import { P5Sketch } from "~/components/P5Sketch";
import { backgroundTerrainSketch } from "~/demos/perlinNoise";
import { useTheme } from "~/theme";

import styles from "~/routes/not-found.module.css";

// GitHub Pages has no server-side redirects, so a migrated page's old URL lands here through 404.html.
const movedPages: Record<string, string> = {
    "/about.html": "/about",
    "/a-star-demo.html": "/demos/a-star",
    "/perlin-noise-demo.html": "/demos/perlin-noise",
    "/masters.html": "/math/lattice-walks",
    "/operators.html": "/math/electromagnetic-operators",
    "/scaling.html": "/math/scaling",
    "/parkour.html": "/life/parkour",
    "/ballroom.html": "/life/ballroom",
    "/photography.html": "/life/photography",
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

    return <PageNotFound />;
}

// A separate component so that old URLs redirect without loading p5.
function PageNotFound() {
    const { theme } = useTheme();

    return (
        <>
            <h1>Page not found</h1>
            <p>
                This page doesn&apos;t exist, but the{" "}
                <Link to="/">home page</Link> does.{" "}
                <span className={styles.steeringHint}>
                    While you&apos;re here, move your mouse to steer over the
                    terrain.
                </span>
            </p>
            <P5Sketch
                sketch={backgroundTerrainSketch}
                variant="background"
                redrawKey={theme}
            />
        </>
    );
}
