import React from "react";
import {Form, Input, Button} from "reactstrap";

const Registration = (props) => {
    return(
        <div>
            <h1>Register</h1>
            <Form className="register" onSubmit={props.submitRegistration}>
                <Input placeholder="Your name" name="name"onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                <p>By providing your email, you're okay with receiving emails related to the service (like the email reminders for following up), and receiving information about the service (like me asking for feedback).</p>
                <Button type="submit">Register</Button>
            </Form>
        </div>
    )
}

export default Registration;