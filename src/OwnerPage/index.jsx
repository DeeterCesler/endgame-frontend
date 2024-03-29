import React from "react";
import { Redirect } from "react-router-dom";

const OwnerPage = (props) => {
    console.log('lol= ' + JSON.stringify(props))
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const loneWolfMax = 1000;
    const startupMax = 5000;
    const enterpriseMax = 100000;
    return(
        <div>
            { props.isLoaded ? 
                <div className="container">  
                    <div className="mini-spacer"/>
                    <div className="mini-spacer"/>
                    <h1>Owner</h1>
                    <br/>
                    { props.numUsersGot 
                    ?
                        <div>
                            <p>Number of users: { props.users.length }</p>
                            <strong>
                                <div className="row">
                                    <span className="col-3">Name</span>
                                    <span className="col-3">Email</span>
                                    <span className="col-2">Plan type</span>
                                    <span className="col-2">User's # of API endpoints</span>
                                    <span className="col-2">User's # of calls this month</span>
                                </div>
                            </strong>
                            {props.users.map((user) => {
                                const callsThisMonth = user.numberOfCalls.details !== undefined ? user.numberOfCalls.details[thisYear][thisMonth] : 0;
                                let overage = false;
                                if (user.planType === "loneWolf") {
                                    if (callsThisMonth > loneWolfMax) {
                                        overage = true;
                                    }
                                } else if (user.planType === "startup") {
                                    if (callsThisMonth > startupMax) {
                                        overage = true;
                                    }
                                } else if (user.planType === "enterprise") {
                                    if (callsThisMonth > enterpriseMax) {
                                        overage = true;
                                    }
                                }
                                return (<div className="row">
                                    <span className="col-3">{user.name}</span>
                                    <span className="col-3">{user.email}</span>
                                    <span className="col-2">{user.planType}</span>
                                    <span className="col-2">{user.endpoints.length}</span>
                                    <span className="col-2">{overage && <strong>OVER LIMIT: </strong>}{callsThisMonth}</span>
                                </div>)
                            })}
                        </div>
                    :
                        <form onSubmit={props.getNumberofUsers}>
                            <button type="submit">Reveal</button>
                        </form>
                    }
                    <br/>
                    <div className="mini-spacer"/>
                    {props.owner ? <div/> : <Redirect to="/"/> }
                </div>
                :
                <div>Loading...</div>
            }
        </div>
    )
}

export default OwnerPage;