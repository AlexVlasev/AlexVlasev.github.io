import React, { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import { LINK_ARRAY } from "./constants";

const PageWithSidebar = ({ title, sidebarLinks }) => {
    const [activePage, setActivePage] = useState(sidebarLinks[0].name);
    const handleClickLink = (name) => {
        setActivePage(name);
    }

    const { component }  = sidebarLinks.filter(link => link.name === activePage)[0];

    return (
        <div>
            <h2>{title}</h2>
            <Sidebar links={sidebarLinks} onClickLink={handleClickLink} />
            {component()}
        </div>
    );
};

PageWithSidebar.propTypes = {
    title: PropTypes.string.isRequired,
    sidebarLinks: LINK_ARRAY.isRequired,
};

export default PageWithSidebar;
