import React from "react";
import {Form, Input, Button} from "reactstrap";

const Login = (props) => {
    return(
        <div>
            <h3>Login</h3>
            <Form className="login" onSubmit={props.submitLogin}>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Button type="submit">Login</Button>
            </Form>
            <p><a href="/reset">Forgot password?</a></p>
        </div>
    )
}

export default Login;