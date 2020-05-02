import React from "react";
import { Form, Input, Button, Alert } from "reactstrap";

const Registration = (props) => {
    let planName;
    if (props.planType) {
        switch (props.planType) {
            case "planA":
                planName = 'Lone Wolf Developer';
                break;
            case "planB":
                planName = "Startup";
                break;
            case "planC":
                planName = "Enterprise";
                break;
            default:
                break;
        }
    }
    return(
        <div>
            <h3>Register for {planName}</h3>
            { props.message && (props.message[0] === "E" || props.message[0] === "J") ? <Alert className="incorrect" color="danger">{props.message}</Alert> : <div/> }
            <Form className="register" onSubmit={props.submitRegistration}>
                <Input placeholder="Your name" name="name"onChange={props.handleInputs}/>
                <Input placeholder="Password" type="password" name="password" onChange={props.handleInputs}/>
                <Input placeholder="Confirm password" type="password" name="passwordCopy" onChange={props.handleInputs}/>
                <Input placeholder="Your email" name="email" onChange={props.handleInputs}/>
                { props.passwordCopy !== null && props.passwordCopy === props.password ?
                    <div>
                        {console.log('pass copy: ' + props.passwordCopy)}
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