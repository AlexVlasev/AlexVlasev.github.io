import Parkour from "./Parkour";
import Ballroom from "./Ballroom";
import MainLife from "./MainLife";
import Photography from "./Photography"

const lifeLinks = [
    {
        component: MainLife,
        name: 'main',
        title: 'Back to main',
    },
    {
        component: Parkour,
        name: 'parkour',
        title: 'Parkour',
    },
    {
        component: Ballroom,
        name: 'ballroom',
        title: 'Lattice Dancing',
    },
    {
        component: Photography,
        name: 'photography',
        title: 'Photography',
    }
];

export default lifeLinks;
