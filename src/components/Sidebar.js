import React from "react";
import PropTypes from "prop-types";
import { LINK_ARRAY } from "./constants";

const Sidebar = ({ links, onClickLink }) => {
    return (
        <div>
            <div>Sidebar</div>
            {links.map((link) => (
                <button type='button' key={link.name} onClick={() => onClickLink(link.name)}>
                    {link.title}
                </button>
            ))}
        </div>
    );
};

Sidebar.propTypes = {
    links: LINK_ARRAY.isRequired,
    onClickLink: PropTypes.func.isRequired,
};

export default Sidebar;
