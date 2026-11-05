import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("demos/a-star", "routes/demos/a-star.tsx"),
        route("demos/perlin-noise", "routes/demos/perlin-noise.tsx"),
        route("math/lattice-walks", "routes/math/lattice-walks.tsx"),
        route(
            "math/electromagnetic-operators",
            "routes/math/electromagnetic-operators.tsx",
        ),
        route("math/scaling", "routes/math/scaling.tsx"),
        route("life/parkour", "routes/life/parkour.tsx"),
        route("life/ballroom", "routes/life/ballroom.tsx"),
        route("life/photography", "routes/life/photography.tsx"),
        route("*", "routes/not-found.tsx"),
    ]),
] satisfies RouteConfig;
