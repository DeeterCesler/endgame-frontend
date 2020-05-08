import React from "react";

const NoMatchPage = () => {
    return(
        <div>
            <div className="spacer"/>
            <h1>This link doesn't exist.</h1>
            <p>Try going back <a href="/">home</a>.</p>
        </div>
    )
}

export default NoMatchPage;