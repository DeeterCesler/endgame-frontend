import React from "react";
import { Form, Input, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Redirect } from "react-router-dom";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS || "https://followup-v1.herokuapp.com/";

export default class EditContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contactName: this.props.contact.contactName,
            contactEmail: this.props.contact.contactEmail,
            contactSummary: this.props.contact.contactSummary,
            dropdownOpen: false,
            // firstReminder: this.props.contact.firstReminder,
            // secondReminder: this.props.contact.secondReminder,
            repeatingReminder: this.props.contact.repeatingReminder,
            firstReminderRhythm: this.props.contact.firstReminderRhythm,
            secondReminderRhythm: this.props.contact.secondReminderRhythm,
            repeatingReminderRhythm: this.props.contact.repeatingReminderRhythm,
            modal: false,
            _id: this.props.contact._id
        }

        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    editContact = async (e) => {
        console.log("EDITING", this.state)
        try{
            // e.preventDefault();
            setTimeout(()=> console.log("waiting"), 5000)
            console.log("EDITING", this.state)
            const pull = await fetch(backendURL+"contact/" + this.state._id + "/edit", {
              method: "PUT",
              body: JSON.stringify(this.state),
              headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
              }
            });
            const parsedPull = await pull.json();
            console.log("information got", parsedPull)
            this.setState({
                redirect: false
            })
            return parsedPull
        } catch(err){
            console.log("error:", err);
        }
    };

    deleteContact = async () => { // NOT FINSIHED
        try{
            console.log("attempting DELETE");
            await fetch(backendURL+"contact/delete", {
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

    toggleModal() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    
    render(){
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to="/contacts/all"/> 
        }
        return(
            <div>
                <Button color="primary" onClick={this.toggleModal}>Edit "{this.props.contact.contactName}"</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <Form onSubmit={this.editContact}>
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                        <h3>edit contact</h3>
                        <br/>
                        <Label>Contact name:</Label>
                        <Input onChange={this.handleChange} type="text" name="contactName" defaultValue={this.props.contact.contactName}/>
                        <br/>
                        <Label>Contact email:</Label>
                        <Input onChange={this.handleChange} type="text" name="contactEmail" defaultValue={this.props.contact.contactEmail}/>
                        <br/>
                        <Label>Info to know about them:</Label>
                        <Input onChange={this.handleChange} type="textarea" name="contactSummary" defaultValue={this.props.contact.contactSummary}/>
                        <br/>
                        <Label>Time between reminders (in days): </Label>
                        <Input onChange={this.handleChange} type="number" name="repeatingReminderRhythm" defaultValue={this.state.repeatingReminderRhythm}/>
                        <div className="mini-spacer"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Submit changes</Button>
                    </ModalFooter>
                </Form>
                <ModalFooter>
                    <Form onSubmit={this.props.deleteContact}>
                        <Button className="delete-left" color="danger" type="subtmi">Delete "{this.props.contact.contactName}"</Button>
                    </Form>
                    <Button onClick={this.toggleModal}>Cancel & Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}