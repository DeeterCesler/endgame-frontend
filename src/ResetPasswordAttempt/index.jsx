import React from "react";
import {Form, Input, Button} from "reactstrap";


class ResetPasswordAttempt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            send: false
        }
    }

    setTrue = (e) => {
        e.preventDefault();
        this.setState({
            send: true
        })
    }

    render(){
        return (
        <div>
            <h1>Reset your password</h1>
                { this.state.send 
                ? 
                <div>
                    <br/>
                    <p>Great - if you have an account, an email has been sent to you to reset your password.</p> 
                </div>
                : 
                <Form className="login" onSubmit={this.props.submitReset && this.setTrue}>
                    <Input placeholder="Your email" name="email" onChange={this.props.handleInputs}/>
                    <Button type="submit">Send reset email</Button>
                </Form>
                }
        </div>
        )
    }
}

export default ResetPasswordAttempt;