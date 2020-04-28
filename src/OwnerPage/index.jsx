import React from "react";
import { Redirect } from "react-router-dom";

const OwnerPage = (props) => {
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
                                    <span className="col-4">User's name</span>
                                    <span className="col-4">User's email</span>
                                    <span className="col-4">User's # of API endpoints</span>
                                </div>
                            </strong>
                            {props.users.map((user) => {
                                return (<div className="row">
                                    <span className="col-4">{user.name}</span>
                                    <span className="col-4">{user.email}</span>
                                    <span className="col-4">{user.endpoints.length}</span>
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