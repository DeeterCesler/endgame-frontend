import React from "react";
import {Form, Input, Button, Alert} from "reactstrap";

const Login = (props) => {
    return(
        <div>
            <h3>Login</h3>
            { props.message ? <Alert className="incorrect" color="danger">Username or password is incorrect.</Alert> : <div/> }
            <Form className="login" onSubmit={props.submitLogin}>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Button type="submit">Login</Button>
            </Form>
            <br/>
            <p><a href="/reset">Forgot password?</a></p>
        </div>
    )
}

export default Login;