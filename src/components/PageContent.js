import React from "react";
import PropTypes from "prop-types";

const PageContent = ({ ContentComponent }) => (<ContentComponent />);

PageContent.propTypes = {
    ContentComponent: PropTypes.func.isRequired,
};

export default PageContent;
