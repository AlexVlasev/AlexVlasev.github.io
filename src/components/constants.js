import PropTypes from "prop-types";
import { Component } from "react";

export const LINK = PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    component: Component,
});

export const LINK_ARRAY = PropTypes.arrayOf(LINK);