
import AStarDemo from "./AStarDemo";
import PerlinNoiseDemo from "./PerlinNoiseDemo";
import MainDemo from "./MainDemo";

const demoLinks = [
    {
        component: MainDemo,
        name: 'main',
        title: 'Back to main',
    },
    {
        component: AStarDemo,
        name: 'a-star',
        title: 'A* Search Algorithm',
    },
    {
        component: PerlinNoiseDemo,
        name: 'perlin',
        title: 'Perlin Noise Terrain Generation',
    }
];

export default demoLinks;
