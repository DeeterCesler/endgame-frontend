import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import FoundEndpoint from "./FoundEndpoint";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

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

    getAllEndpoints = async () => {
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
    
    componentDidMount() {
        this.getAllEndpoints();
    }

    render(){
        return (
            <div>
                {
                    !this.props.isLoaded ?
                    null
                    :
                    <div>
                        {this.props.loggedIn ?
                        <div className="container">
                            {this.state.allEndpoints.length
                                ? 
                                <div>
                                    <div className="mini-spacer" />
                                    <div className="light-gray container">
                                        <h2 className="link"><a href="/routes/new">Create an endpoint</a></h2>
                                    </div>
                                    <br/>
                                    <div className="light-gray container">
                                        <h2>Existing endpoints</h2>
                                        {this.state.allEndpoints.map(endpoint => <FoundEndpoint layerOne={endpoint.layerOne} key={endpoint._id} userId={this.props.id} routeId={endpoint._id} route={Object.keys(endpoint.layerOne)[0]} deleteEndpoint={(e) => {this.deleteEndpoint(e, endpoint)}} />)}
                                    </div>
                                    <br/>
                                </div>
                                :
                                <div>
                                    <div className="spacer" />
                                    <p><strong>No endpoints yet.</strong></p>
                                    <p><a href="/routes/new">Why not create one?</a></p>
                                </div>
                            }
                        </div>
                        : 
                        <div>
                            {console.log('help3')}
                            {this.props.isRegistered && <Redirect to="/plans"/> }
                            {!this.props.isRegistered && <Redirect to="/register"/>}
                        </div>
                        }
                    </div>
                }
                </div>
        )
    }
}

export default AllUserEndpoints;