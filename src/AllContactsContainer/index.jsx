import React, {Component} from "react";
import AllContacts from "./AllContacts";
import { Redirect } from "react-router-dom";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS || "https://followup-v1.herokuapp.com/";

class AllContactsContainer extends Component {
    constructor(props){
        super();
        this.state = {
            loaded: false,
        }
    }
    
    getAllContacts = async () => {
        console.log("tryna pull contacts")
        try{
            const pull = await fetch(backendURL + "contact/" + this.props.email,{
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });
            const parsedPull = await pull.json();
            let names = parsedPull.data.filter(item => item.contactName);
            this.setState({ // need to refactor this out since this component is now functional
                info: parsedPull.data,
                loaded: true,
                completeData: names
            });
            return parsedPull
        } catch(err){
            console.log("whoops lol")
            console.log("error:", err);
        }
    }

    componentDidMount = async () => {
        if(this.props.email !== undefined){
            this.getAllContacts();
        }
    }
    
    render(){
        return (
            <div className="background">
                {this.state.data ? <Redirect to="/contacts/new"/>: <div/> }
                {this.state.loaded? console.log("bitch", this.state.info): <p>not loaded</p>}
                <div className="contacts-spacer"/>
                <div className="container contacts-container large-view">
                    <div>
                        <div>
                            <div>
                                <div className="tiny-spacer"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg"><strong>Name:</strong></div>
                            <div className="col-sm"><strong>Email:</strong></div>
                            <div className="col-sm"><strong>Topic discussed:</strong></div>
                            <div className="col-lg"><strong>Edit</strong></div>
                            <div className="col-lg"><strong>Delete?</strong></div>
                        </div>
                        {this.state.loaded? 
                        this.state.completeData.map((data)=>{
                            return <AllContacts data={data} key={data._id}/> 
                        })
                        : 
                        <div>
                            <div>
                                <p>not loaded</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="small-view">
                {this.state.loaded? 
                    this.state.completeData.map((data)=>{
                        return <AllContacts data={data} key={data._id}/> 
                    })
                    : 
                    <div>
                        <div>
                            <p>not loaded</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default AllContactsContainer;