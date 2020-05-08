import React from "react";
import { Redirect } from "react-router-dom";

const NoMatchPage = (props) => {
    console.log('lol= ' + JSON.stringify(props))
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    return(
        <div>
            <div className="spacer"/>
            <h1>This link doesn't exist.</h1>
            <p>Try going back <a href="/">home</a>.</p>
        </div>
    )
}

export default NoMatchPage;