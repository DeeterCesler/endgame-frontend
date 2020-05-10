import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import FoundEndpoint from "./FoundEndpoint";
import NewEndpoint from "./NewEndpoint";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

const defaultText = `{
    "yourKeyHere": "yourValueHere",
    "wantABoolean": true,
    "valueNumber": 3,
    "nestedObject": {
        "sampleKey":"sampleValue"
    }
}`

class AllUserEndpoints extends Component {
    constructor(props){
        super(props);
        this.state = {
            response: null,
            endpointsGot: false,
            allEndpoints: []
        }
    }

    deleteEndpoint = async (e, endpoint) => {
        e.preventDefault();
        try{
            console.log("DELETING ENDPOINT")
            await fetch(backendURL + endpoint._id, {
                method: "DELETE",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
                }
            })
            this.setState({
                ...this.state,
                endpointsGot: false,
            })
        } catch(error){
            console.log(error);
        }
    }

    getAllEndpoints = async (e) => {
        e.preventDefault();
        try{
            console.log("GETTING ENDPOINTS")
            const submittedEndpoint = await fetch(backendURL + "all", {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
                    // 'Access-Control-Allow-Headers': "POST",
                    // 'credentials': 'same-origin',
                }
            })
            const parsedResponse = await submittedEndpoint.json();
            this.setState({
                allEndpoints: parsedResponse.data,
                endpointsGot: true
            })
        } catch(error){
            console.log(error);
        }
    }

    render(){
        return (
            <div>
                {this.props.endpointsGot 
                    ? 
                    <div>
                        <h4>Found endpoints</h4>
                        {this.props.allEndpoints.map(endpoint => <FoundEndpoint layerOne={endpoint.layerOne} key={endpoint._id} userId={this.props.id} routeId={endpoint._id} route={Object.keys(endpoint.layerOne)[0]} deleteEndpoint={(e) => {this.props.deleteEndpoint(e, endpoint)}} />)}
                    </div>
                    :
                    <div>
                        <h3>Show all your endpoints</h3>
                        <form onSubmit={this.props.getAllEndpoints}>
                            <button type="submit">Reveal</button>
                        </form>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                }
            </div>
        )
    }
}

export default AllUserEndpoints;