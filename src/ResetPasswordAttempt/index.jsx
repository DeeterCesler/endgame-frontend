import React from "react";
import {Form, Input, Button} from "reactstrap";

const ResetPasswordAttempt = (props) => {
    return (
        <div className="container">
            <div className="spacer" />
            <h1>Reset your password</h1>
                <br />
                { props.send 
                ? 
                <div>
                    <br/>
                    <p>Great - if you have an account, an email has been sent to you to reset your password.</p> 
                </div>
                : 
                <div className="container">
                    <Form className="login" onSubmit={props.submitReset}>
                        <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                        <Button type="submit">Send reset email</Button>
                    </Form>
                </div>
                }
        </div>
    )
}

export default ResetPasswordAttempt;