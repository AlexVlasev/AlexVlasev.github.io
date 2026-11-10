export type NavLinkItem = {
    label: string;
    href: string;
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
            { label: "A* Algorithm Demo", href: "/demos/a-star" },
            {
                label: "Perlin Noise Terrain Demo",
                href: "/demos/perlin-noise",
            },
        ],
    },
    {
        label: "Mathematics",
        items: [
            { label: "Lattice Walk Enumeration", href: "/math/lattice-walks" },
            {
                label: "Electromagnetic Operators",
                href: "/math/electromagnetic-operators",
            },
            { label: "Scaling of Human Processes", href: "/math/scaling" },
        ],
    },
    {
        label: "Lifestyle",
        items: [
            { label: "Parkour", href: "/life/parkour" },
            { label: "Ballroom Dancing", href: "/life/ballroom" },
            { label: "Photography", href: "/life/photography" },
        ],
    },
    { label: "About", href: "/about" },
];

export const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alexvlasev/" },
    { label: "GitHub", href: "https://github.com/AlexVlasev" },
    { label: "X", href: "https://x.com/alex_vlasev" },
    { label: "Instagram", href: "https://www.instagram.com/alex.vlasev" },
    { label: "Substack", href: "https://alexvlasev.substack.com/" },
];
