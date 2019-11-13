import React from "react";
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Redirect } from "react-router-dom";
import EditContact from "./EditContact";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS || "https://followup-v1.herokuapp.com/";

export default class SingleContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
                <div>
                    <Button color="info" className="view-button" onClick={this.toggleModal}>{this.props.contact.contactName}</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                <ModalBody>
                    <h3>View Contact</h3>
                        <br/>
                        <Label><strong>Contact name:</strong></Label>
                        <p>{this.props.contact.contactName}</p>
                        <br/>
                        <Label><strong>Contact email:</strong></Label>
                        <p>{this.props.contact.contactEmail}</p>
                        <br/>
                        <Label><strong>Info to know about them:</strong></Label>
                        <p>{this.props.contact.contactSummary}</p>
                        <br/>
                        <Label><strong>Time between reminders (in days):</strong></Label>
                        <p>{this.props.contact.repeatingReminderRhythm}</p>
                        <div className="mini-spacer"/>
                    </ModalBody>
                <ModalFooter>
                <EditContact deleteContact={this.props.deleteContact} contact={this.props.contact}/>
                <Button onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
            </Modal>
        </div>
        )
    }
}