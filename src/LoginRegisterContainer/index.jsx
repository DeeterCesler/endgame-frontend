import React from "react";
import Login from "../Login";
import Registration from "../Registration";
import { Redirect } from 'react-router-dom';
import AboutPage from "../AboutPage";

const LoginRegisterContainer = (props) => {
    return(
        <div>
            {console.log("LOGGED: " + props.test)}
            <div>
                {props.loggedIn ? <Redirect to="/"/>: <div/> }
                <div className="mini-spacer"/>
                <AboutPage/>
                <br/>
                <br/>
                {/* <h4>To get started, you first need to log in.</h4> */}
                <Login submitRegistration={props.submitRegistration} handleInputs={props.handleInputs} submitLogin={props.submitLogin} loggedIn={props.loggedIn}/>
                <div className="spacer"/>
                {/* When SaaS-ready, replace "Registration" with a buy/sign-up page */}
                <Registration submitRegistration={props.submitRegistration} handleInputs={props.handleInputs} submitLogin={props.submitLogin} loggedIn={props.loggedIn}/>
                <div className="spacer"/>
            </div>
        </div>
    )
}

export default LoginRegisterContainer;