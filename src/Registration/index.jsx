import React from "react";
import { Form, Input, Button, Alert } from "reactstrap";

const Registration = (props) => {
    return(
        <div className="red-outline">
            <h3>Register</h3>
            { props.message && (props.message[0] === "E" || props.message[0] === "J") ? <Alert className="incorrect" color="danger">{props.message}</Alert> : <div/> }
            <Form className="register" onSubmit={props.submitRegistration}>
                <Input placeholder="Your name" name="name"onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Input placeholder="Confirm password" type="password" name="passwordCopy" onChange={props.handleInputs}/>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                { props.passwordCopy !== null && props.passwordCopy === props.password ?
                    <div>
                        <p className="small">By providing your email, you're okay with receiving emails related to the service (current emails send to date: 0), and receiving information about the service (like me asking for feedback).</p>
                        <Button type="submit">Register</Button>
                    </div>
                :
                    props.passwordCopy && 
                    props.passwordCopy.length > 0 &&
                    <div className="small">Passwords must match.</div>
                }
            </Form>
        </div>
    )
}

export default Registration;