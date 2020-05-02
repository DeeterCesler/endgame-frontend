import React from "react";
import {Form, Input, Button, Alert} from "reactstrap";

const Login = (props) => {
    return(
        <div>
            <h3>Login</h3>
            { props.message && props.message[0] === "U" ? <Alert className="incorrect" color="danger">{props.message}</Alert> : <div/> }
            <Form className="login" onSubmit={props.submitLogin}>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Button type="submit">Login</Button>
            </Form>
            {/* <br/> */}
            <p className="small forgot"><a href="/reset">Forgot password?</a></p>
        </div>
    )
}

export default Login;