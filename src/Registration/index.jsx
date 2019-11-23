import React from "react";
import {Form, Input, Button} from "reactstrap";

const Registration = (props) => {
    return(
        <div>
            <h3>Register</h3>
            <Form className="register" onSubmit={props.submitRegistration}>
                <Input placeholder="Your name" name="name"onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                <p>By providing your email, you're okay with receiving emails related to the service (current emails send to date: 0), and receiving information about the service (like me asking for feedback).</p>
                <Button type="submit">Register</Button>
            </Form>
        </div>
    )
}

export default Registration;