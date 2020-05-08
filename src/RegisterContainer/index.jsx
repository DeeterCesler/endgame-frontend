import React from "react";
import Registration from "../Registration";
import { Redirect } from 'react-router-dom';
import AboutPage from "../AboutPage";

const RegisterContainer = (props) => {
    return(
        <div className="container">
            {props.loggedIn ? <Redirect to="/"/>: null }
            {props.isRegistered ? <Redirect to="/plans"/>: null }
            <div className="spacer"/>
            <AboutPage/>
            <div className="mini-spacer"/>
            <br/>
            <br/>
            <div className="gray">
                <br/>
                <h2>how to get started</h2>
                <br/>
                <br/>
                <div className="row">
                    <div className="col step">
                        <h5>1. Register your account</h5>
                        <p className="small">You can do that in the form below.</p>
                    </div>
                    <div className="col step">
                        <h5>2. Choose a plan</h5>
                        <p className="small">Three plans tailored to how often you'll use this service.</p>
                    </div>
                    <div className="col step">
                        <h5>3. Start using your simulated backend</h5>
                        <p className="small">Make an endpoint and <i>immediately</i> get working JSON.</p>
                    </div>
                </div>
            </div>
            <div className="spacer"/>
            {/* <div className="mini-spacer"/> */}
            <Registration 
                submitRegistration={props.submitRegistration} 
                handleInputs={props.handleInputs}
                loggedIn={props.loggedIn}
                message={props.message}
                planType={props.planType}
                password={props.password}
                passwordCopy={props.passwordCopy}
            />
            {/* When SaaS-ready, replace "Registration" with a buy/sign-up page */}
            <div className="spacer"/>
        </div>
    )
}

export default RegisterContainer;