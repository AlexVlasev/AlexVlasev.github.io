import React from "react";
import PropTypes from "prop-types";

const BasePage = ({ title }) => {
    const pretty = title.toUpperCase();
    return (
        <>
            <div>
                <h2>{pretty}</h2>
                <div>
                    <div>Sidebar</div>
                </div>
                <div>
                    <div>Main Content</div>
                </div>
            </div>
        </>
    );
};

BasePage.propTypes = {
    title: PropTypes.string.isRequired,
};

export default BasePage;
