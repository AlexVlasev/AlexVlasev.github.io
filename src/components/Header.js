import React from 'react';
import { HashRouter, NavLink, Route } from "react-router-dom";
import Home from "../Home/Home";
import Demo from "../Demo/Demo";
import Mathematics from "../Mathematics/Mathematics";
import Life from "../Life/Life";
import Thoughts from "../Thoughts/Thoughts";
import Contact from "../Contact/Contact";

const Header = () => (
    <HashRouter>
        <div>
            <h1>Simple SPA</h1>
            <ul className="header">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/demo">Demos</NavLink></li>
                <li><NavLink to="/mathematics">Math</NavLink></li>
                <li><NavLink to="/life">Life</NavLink></li>
                <li><NavLink to="/thoughts">Thoughts</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home} />
                <Route path="/demo" component={Demo} />
                <Route path="/mathematics" component={Mathematics} />
                <Route path="/life" component={Life} />
                <Route path="/thoughts" component={Thoughts} />
                <Route path="/contact" component={Contact} />
            </div>
        </div>
    </HashRouter>
);

export default Header;