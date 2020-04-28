import React from "react";

const AccountPage = (props) => {
    return(
        <div>
            <div className="mini-spacer"/>
            <div className="mini-spacer"/>
            <h1>Account</h1>
            <br/>
            <h5>Send me an email! I always want to hear what you love, hate, or just would love to see next.</h5>
            <p>your email: <strong>{props.email}</strong></p>
            <p>your name: <strong>{props.name}</strong></p>
            { props.owner ? <a href="/owner">Go to owner page</a> : <div/> }
            <br/>
        </div>
    )
}

export default AccountPage;