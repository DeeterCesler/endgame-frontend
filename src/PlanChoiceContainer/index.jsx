import React from "react";
import { Redirect } from 'react-router-dom';
import AboutPage from "../AboutPage";
import { Button } from "reactstrap";


const PlanChoiceContainer = (props) => {
    console.log('props: ' + JSON.stringify(props))
    return(
        <div className="container">
            {props.loggedIn ? <Redirect to="/"/>: <div/> }
            <div className="mini-spacer"/>
            <div className="mini-spacer"/>
            <h1>Choose the plan that works best for you</h1>
            <br/>
            <div className="mini-spacer"/>
            <div className="row">
                <div className="col-md">
                    <div className={`planA plan ${props.planType === "planA" ? `show` : null}`} onClick={props.handleCheck} id="planA">
                        <div className="product-header">Lone wolf developer</div>
                        <br/>
                        <ul className="deets text-left">
                            <li>1,000 API calls per month</li>
                            <li>Create up to 50 endpoints</li>
                            <li>$4.99/month</li>
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
                                <li>$64.99/month</li>
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
                                <li>$349.99/month</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <br/>
            {
                props.planType
                &&
                <form onSubmit={props.submitBuyPlan}>
                    <Button type="submit">Submit</Button>
                </form>
            }
            {/* When SaaS-ready, replace "Registration" with a buy/sign-up page */}
            <div className="spacer"/>
        </div>
    )
}

export default PlanChoiceContainer;