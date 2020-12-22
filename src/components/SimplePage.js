import React from "react";
import PropTypes from "prop-types";

const SimplePage = ({ title, ContentComponent }) => (
    <div>
        <h2>{title}</h2>
        <ContentComponent />
    </div>
);

SimplePage.propTypes = {
    title: PropTypes.string.isRequired,
    ContentComponent: PropTypes.func.isRequired,
};

export default SimplePage;
