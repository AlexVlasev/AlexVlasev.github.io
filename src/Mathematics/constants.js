import Electromagnetism from "./Electromagnetism";
import Lattice from "./Lattice";
import MainMath from "./MainMath";
import Scaling from "./Scaling"

const mathLinks = [
    {
        component: MainMath,
        name: 'main',
        title: 'Back to main',
    },
    {
        component: Electromagnetism,
        name: 'electromagnetism',
        title: 'Electromagnetism',
    },
    {
        component: Lattice,
        name: 'lattice-walks',
        title: 'Lattice Dancing',
    },
    {
        component: Scaling,
        name: 'scaling',
        title: 'Scaling',
    }
];

export default mathLinks;
