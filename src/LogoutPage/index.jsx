import React from "react";
import {Redirect} from "react-router-dom";

const LogoutPage = (props) => {
    props.logout();
    return(
        <Redirect to="/" />
    )
}

export default LogoutPage;