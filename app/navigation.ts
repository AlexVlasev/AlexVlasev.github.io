export type NavLinkItem = {
    label: string;
    href: string;
    // Legacy pages are separate HTML files, so they need a full page load.
    legacy?: boolean;
};

export type NavGroup = {
    label: string;
    items: NavLinkItem[];
};

export const navigation: (NavLinkItem | NavGroup)[] = [
    { label: "Home", href: "/" },
    {
        label: "Demos",
        items: [
            {
                label: "A* Algorithm Demo",
                href: "/a-star-demo.html",
                legacy: true,
            },
            {
                label: "Perlin Noise Terrain Demo",
                href: "/perlin-noise-demo.html",
                legacy: true,
            },
        ],
    },
    {
        label: "Mathematics",
        items: [
            {
                label: "Lattice Walk Enumeration",
                href: "/masters.html",
                legacy: true,
            },
            {
                label: "Electromagnetic Operators",
                href: "/operators.html",
                legacy: true,
            },
            {
                label: "Scaling of Human Processes",
                href: "/scaling.html",
                legacy: true,
            },
        ],
    },
    {
        label: "Lifestyle",
        items: [
            { label: "Parkour", href: "/parkour.html", legacy: true },
            { label: "Ballroom Dancing", href: "/ballroom.html", legacy: true },
            { label: "Photography", href: "/photography.html", legacy: true },
        ],
    },
    { label: "About", href: "/about.html", legacy: true },
];

export const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alexvlasev/" },
    { label: "GitHub", href: "https://github.com/AlexVlasev" },
    { label: "X", href: "https://x.com/alex_vlasev" },
    { label: "Instagram", href: "https://www.instagram.com/alex.vlasev" },
];
