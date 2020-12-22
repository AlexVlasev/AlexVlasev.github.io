import React from "react";
import SimplePage from '../components/SimplePage';

const Comp = () => (<div>Page</div>);

const Home = () => (
    <SimplePage title='Home' ContentComponent={Comp} />
);

export default Home;