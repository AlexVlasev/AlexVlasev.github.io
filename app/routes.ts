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
        route("life/parkour", "routes/life/parkour.tsx"),
        route("life/ballroom", "routes/life/ballroom.tsx"),
        route("life/photography", "routes/life/photography.tsx"),
        route("*", "routes/not-found.tsx"),
    ]),
] satisfies RouteConfig;
