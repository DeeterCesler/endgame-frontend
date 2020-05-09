import React from "react";
import {Form, Input, Button} from "reactstrap";
import { Redirect } from "react-router-dom";

class ResetPassword extends React.Component {
    render() {
        return (
        <div>
            <div className="spacer" />
            <h1>Confirm new password</h1>
            <br />
            <div className="container">
                <Form className="login" onSubmit={this.props.setNewPassword}>
                    <Input type="hidden" name="id" defaultValue={this.props.match.params.id}/>
                    <Input placeholder="Your new password" type="password" name="password" onChange={this.props.handleInputs}/>
                    <Input placeholder="Confirm password" type="password" name="passwordCopy" onChange={this.props.handleInputs}/>
                    { this.props.passwordCopy !== null && this.props.passwordCopy === this.props.password ?
                        <Button type="submit">Reset password</Button>
                    :
                        this.props.passwordCopy && 
                        this.props.passwordCopy.length > 0 &&
                        <div className="small">Passwords must match.</div>
                    }
                </Form>
            </div>
            {
                this.props.send
                &&
                <div>
                    <p>Password successfully changed! Redirecting...</p>
                    <Redirect to="/login" />
                </div>
            }
        </div>
        )
    }
}

export default ResetPassword;