import React from "react";
import { Redirect } from "react-router-dom";

const OwnerPage = (props) => {
    console.log('lol= ' + JSON.stringify(props))
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
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
                                    <span className="col-3">User's name</span>
                                    <span className="col-3">User's email</span>
                                    <span className="col-3">User's # of API endpoints</span>
                                    <span className="col-3">User's # of calls this month</span>
                                </div>
                            </strong>
                            {props.users.map((user) => {
                                return (<div className="row">
                                    <span className="col-3">{user.name}</span>
                                    <span className="col-3">{user.email}</span>
                                    <span className="col-3">{user.endpoints.length}</span>
                                    <span className="col-3">{user.numberOfCalls.details !== undefined ? user.numberOfCalls.details[thisYear][thisMonth] : <span>0</span>}</span>
                                    {/* <span className="col">{user.endpoints.length}</span> */}
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