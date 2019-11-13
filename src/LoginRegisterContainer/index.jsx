import React, {Component} from "react";
import Login from "../Login";
import Registration from "../Registration";
import { Redirect } from 'react-router-dom';

class LoginRegisterContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {console.log("LOGGED: " + this.props.test)}
                {/* {this.props.loggedIn ? <Redirect to="/"/>: <div/> } */}
                <div className="background">
                    {this.props.loggedIn ? <Redirect to="/"/>: <div/> }
                    <div className="spacer"/>
                    <Login submitRegistration={this.props.submitRegistration} handleInputs={this.props.handleInputs} submitLogin={this.props.submitLogin} loggedIn={this.props.loggedIn}/>
                    <div className="mini-spacer"/>
                    {/* When SaaS-ready, replace "Registration" with a buy/sign-up page */}
                    <Registration submitRegistration={this.props.submitRegistration} handleInputs={this.props.handleInputs} submitLogin={this.props.submitLogin} loggedIn={this.props.loggedIn}/>
                    <div className="spacer"/>
                </div>
            </div>
        )
    }
}

export default LoginRegisterContainer;