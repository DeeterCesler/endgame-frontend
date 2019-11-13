import React from "react";
import { Form, Button } from "reactstrap";
import EditContact from "../../EditContact";
import SingleContact from "../../SingleContact";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS || "https://followup-v1.herokuapp.com/";

const AllContacts = (props) => {

    const deleteContact = async () => {
        try{
            console.log("DELETE");
            // console.log(this.props.data._id);
            const pull = await fetch(backendURL+"contact/" + props.data._id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem("token")
            } 
            });
            const parsedPull = await pull.json();
            return parsedPull
        } catch(err){
            console.log("error:", err);
        }
    }

    return(
        <div>
            <div className="large-view">
                <div className="row contacts-row large-view">
                    <div className="col-lg">{props.data.contactName}</div>
                    <div className="col-lg">{props.data.contactEmail}</div>
                    <div className="col-sm">{props.data.contactSummary}</div>
                    <div className="col-md">
                        <EditContact contact={props.data}/>
                    </div>
                    <div className="col-sm">
                        <Form onSubmit={deleteContact}>
                            <Button type="submit">Delete "{props.data.contactName}"</Button>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="small-view">
                <SingleContact deleteContact={deleteContact} contact={props.data}/>
            </div>
        </div>
    )
}

export default AllContacts;