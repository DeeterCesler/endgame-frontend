import React from "react";
import { Redirect } from 'react-router-dom';
import { Button } from "reactstrap";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS


class SuccessPage extends React.Component {
    constructor(props){
        super(props);
    }

    propCheck = async () => {
        if (this.props.match.params.sessionId.length > 10) {
            try {
                const targetUrl = backendURL + 'auth/success/confirm';
                const response = await fetch(targetUrl, {
                    method: 'POST',
                    body: JSON.stringify({sessionId: this.props.match.params.sessionId}),
                    headers: {
                      'Access-Control-Allow-Origin': targetUrl,
                      'Content-Type': 'application/json',
                      'credentials': 'same-origin',
                    }
                });
                const parsed = await response.json();
                console.log('IT COMING');
                console.log(parsed);
                alert(parsed.data);
            } catch (err) {
                console.log(err)
            }
        }
    }


    componentDidMount(){
        this.propCheck();
    }

    render(){
        return(
            <div className="container">
                {this.props.loggedIn ? <Redirect to="/"/>: <div/> }
                <div className="mini-spacer"/>
                <div className="mini-spacer"/>
                <div className="success">
                    <br/>
                    <h1>Thanks for signing up!</h1>
                    <br/>
                    <p><strong>You're going to love it.</strong>
                    <br/>
                    Logging you in now...</p>
                    <br/>
                </div>
                {/* <p>{props.match.params.sessionId}</p> */}
                <br/>
                <div className="spacer"/>
            </div>
        )
    }
}

export default SuccessPage;