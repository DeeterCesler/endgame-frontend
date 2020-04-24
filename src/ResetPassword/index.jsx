import React from "react";
import {Form, Input, Button} from "reactstrap";

class ResetPassword extends React.Component {
    render() {
        return (
        <div>
            <h1>Confirm new password</h1>
            <Form className="login" onSubmit={this.props.setNewPassword}>
                <Input type="hidden" name="id" defaultValue={this.props.match.params.id}/>
                <Input placeholder="Your new password" name="password" onChange={this.props.handleInputs}/>
                <Button type="submit">Reset password</Button>
            </Form>
        </div>
        )
    }
}

export default ResetPassword;