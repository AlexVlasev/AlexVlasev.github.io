import React from "react";
import PageWithSidebar from "../components/PageWithSidebar";
import thoughtLinks from "./constants";

const Thoughts  = () => (
    <PageWithSidebar title='Thoughts' sidebarLinks={thoughtLinks} />
);

export default Thoughts;