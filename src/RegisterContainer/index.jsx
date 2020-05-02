import React from "react";
import Registration from "../Registration";
import Login from "../Login";
import { Redirect } from 'react-router-dom';
import AboutPage from "../AboutPage";

const RegisterContainer = (props) => {
    return(
        <div className="container">
            {props.loggedIn ? <Redirect to="/"/>: <div/> }
            <div className="mini-spacer"/>
            <AboutPage/>
            <br/>
            <div className="row">
                <div className="col-md">
                    <div className={`planA plan ${props.planType === "planA" ? `show` : null}`} onClick={props.handleCheck} id="planA">
                        <div className="product-header">Lone wolf developer</div>
                        {/* <div className="container"> */}
                            <br/>
                        <ul className="deets text-left">
                            <li>1,000 API calls per month</li>
                            <li>Create up to 50 endpoints</li>
                            <li>$5/month</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md">
                    <div className={`planB plan ${props.planType === "planB" ? `show` : null}`} onClick={props.handleCheck} id="planB">
                        <div className="product-header">Startup</div>
                        <div>
                            <br/>
                            <ul className="deets text-left">
                                <li>5,000 API calls per month</li>
                                <li>Create up to 250 endpoints</li>
                                <li>$65/month</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md">
                    <div className={`planC plan ${props.planType === "planC" ? `show` : null}`} onClick={props.handleCheck} id="planC">
                        <div className="product-header">Enterprise</div>
                        <div>
                            <ul className="deets text-left">
                            <br/>
                                <li>100,000 API calls per month</li>
                                <li>Create up to 5,000 endpoints</li>
                                <li>$349/month</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mini-spacer"/>
            {
                props.planType
                &&
                <Registration 
                    submitRegistration={props.submitRegistration} 
                    handleInputs={props.handleInputs}
                    submitLogin={props.submitLogin}
                    loggedIn={props.loggedIn}
                    message={props.message}
                    planType={props.planType}
                    password={props.password}
                    passwordCopy={props.passwordCopy}
                />
            }
            {/* When SaaS-ready, replace "Registration" with a buy/sign-up page */}
            <div className="spacer"/>
        </div>
    )
}

export default RegisterContainer;