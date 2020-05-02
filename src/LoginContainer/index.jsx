import React from "react";
import Login from "../Login";
import { Redirect } from 'react-router-dom';
import AboutPage from "../AboutPage";

const LoginContainer = (props) => {
    return(
        <div>
            <div className="container">
                {props.loggedIn ? <Redirect to="/"/>: <div/> }
                <div className="mini-spacer"/>
                <div className="mini-spacer"/>
                <AboutPage/>
                <br/>
                <br/>
                {/* <h4>To get started, you first need to log in.</h4> */}
                <Login submitRegistration={props.submitRegistration} handleInputs={props.handleInputs} submitLogin={props.submitLogin} loggedIn={props.loggedIn} message={props.message} />
                <div className="mini-spacer"/>
                <div className="med-spacer"/>
                <h5>Don't have an account yet?</h5>
                <h5><a href="/register">Sign up</a></h5>
                <div className="spacer"/>
                {/* When SaaS-ready, replace "Registration" with a buy/sign-up page */}
            </div>
        </div>
    )
}

export default LoginContainer;