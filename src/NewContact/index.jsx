import React from "react";
import { Form, Input, Button, Label, FormGroup } from "reactstrap";
import { Redirect } from "react-router-dom";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS || "https://followup-v1.herokuapp.com/";

export default class NewContact extends React.Component{
    constructor(){
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            contactName: "",
            contactEmail: "",
            contactSummary: "",
            dropdownOpen: false,
            firstReminderInterval: "1",
            secondReminderInterval: "1",
            repeatingReminderInterval: "1",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    postNewContact = async (e) => {
        e.preventDefault();
        try{
            console.log("POSTING")
            const pull = await fetch(backendURL + "contact/new", {
              method: "POST",
              body: JSON.stringify(this.state),
              headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
              } 
            });
            const parsedPull = await pull.json();
            console.log("information got", parsedPull)
            this.setState({
                redirect: true
            })
            return parsedPull
        } catch(err){
            console.log("error:", err);
        }
    };

    deleteContact = async () => { // NOT FINSIHED
        try{
            console.log("attempting DELETE");
            await fetch(backendURL + "contact/delete", {
                method: "POST",
            })
        }catch(err){
            console.log("error: ", err);
        }
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render(){
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to="/contacts/all"/> 
        }
        return(
            <div className="background">
                <div className="spacer"></div>
                <h3>add a new contact</h3>
                <Form className="explainer" onSubmit={this.postNewContact}>
                    <Input onChange={this.handleChange} type="text" name="contactName" placeholder="Contact name..."/>
                    <Input onChange={this.handleChange} type="text" name="contactEmail" placeholder="Their email..."/>
                    <Input onChange={this.handleChange} type="textarea" name="contactSummary" placeholder="What did you talk about?"/>
                    <div className="mini-spacer"/>
                    <h4>when do you want to be reminded to reach out?</h4>
                    <br/>
                    <div className="container text-center">

                        <Label className="explainer-text">When do you want your first reminder to follow up?</Label>
                        <div className="row new-contact-row">
                            <div className="input-item">
                                <FormGroup>
                                    <Input onChange={this.handleChange} type="number" name="firstReminder" placeholder="1 day from now"/>
                                </FormGroup>
                            </div>
                            <div className="input-item">
                                <FormGroup>
                                    <Input onChange={this.handleChange} type="select" name="firstReminderInterval">
                                        <option value="1" selected="selected">Day(s)</option>
                                        <option value="7">Week(s)</option>
                                        <option value="30">Month(s)</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </div>
                        <br/>

                        <Label className="explainer-text">When do you want your second reminder?</Label>
                        <div className="row new-contact-row">
                            <div className="input-item">
                                <FormGroup>
                                    <Input onChange={this.handleChange} type="number" name="secondReminder" placeholder="3 days from now"/>
                                </FormGroup>
                            </div>
                            <div className="input-item">
                                <FormGroup>
                                    <Input type="select" name="secondReminderInterval">
                                        <option value="1" selected="selected">Day(s)</option>
                                        <option value="7">Week(s)</option>
                                        <option value="30">Month(s)</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </div>
                        <br/>

                        {/* <label className="explainer-text">Third reminder (weeks): 
                            <Input onChange={this.handleChange} type="number" name="thirdReminder" placeholder="4"/>
                            <Input type="select" name="thirdReminder-interval">
                                <option value="1">Day(s)</option>
                                <option value="7">Week(s)</option>
                                <option value="30">Month(s)</option>
                            </Input>
                        </label>
                        <br/>
                        <br/>
                        <label className="explainer-text">Fourth reminder (months): 
                            <Input onChange={this.handleChange} type="number" name="fourthReminder" placeholder="3"/>
                            <Input type="select" name="fourthReminder-interval">
                                <option value="1">Day(s)</option>
                                <option value="7">Week(s)</option>
                                <option value="30">Month(s)</option>
                            </Input>
                        </label>
                        <br/>
                        <br/> */}

                        <Label className="explainer-text">How often do you want to be reminded in general to follow up?</Label>
                        <div className="row new-contact-row">
                            <div className="input-item">
                                <FormGroup>
                                    <Input onChange={this.handleChange} type="number" name="repeatingReminder" placeholder="Every 7 days"/>
                                </FormGroup>
                            </div>
                            <div className="input-item">
                                <FormGroup>
                                    <Input onChange={this.handleChange} type="select" name="repeatingReminderInterval">
                                        <option value="1" selected="selected">Day(s)</option>
                                        <option value="7">Week(s)</option>
                                        <option value="30">Month(s)</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
                <div className="spacer"/>
            </div>
        )
    }
}