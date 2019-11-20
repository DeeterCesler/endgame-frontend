import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import FoundEndpoint from "./FoundEndpoint";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            endpointName: "",
            endpointValue: "",
            response: null,
            endpointsGot: false,
            allEndpoints: []
        }
    }
    
    handleInputs = (e) => {
        this.setState({
          ...this.state,
          [e.currentTarget.name]: e.currentTarget.value
        })
    }

    submitEndpoint = async (e) => {
        e.preventDefault();
        console.log("FUCK THIS SHIT")
        try{
            console.log("SUBMITTING ENDPOINT")
            const submittedEndpoint = await fetch(backendURL + "new", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
                    // 'Access-Control-Allow-Headers': "POST",
                    // 'credentials': 'same-origin',
                }
            })
            const parsedResponse = await submittedEndpoint.json();
            console.log(parsedResponse);
            this.setState({
                response: parsedResponse
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
                {/* {this.props.loggedIn ? <Redirect to="/login"/> : <div/> } */}
                {this.props.loggedIn ?
                <div>
                    <h1>create an endpoint</h1>
                    <form onSubmit={this.submitEndpoint}>
                        <input onChange={this.handleInputs} className="input" name="endpointName" type="text" placeholder='endpoint name, e.g. "/test"'/>
                        <br/>
                        <textarea onChange={this.handleInputs} className="input" name="endpointValue" type="textarea" height="300px" placeholder="The response you want back (in JSON)"/>
                        <br/>
                        <button className="input" type="submit">Submit</button>
                    </form>
                    <br/>
                    {
                        this.state.response != null ?
                        <div>
                            <p>Endpoint successfully submitted.</p>
                            <p>Your new endpoint can be hit at <br/><code>https://endpoint-backend.herokuapp.com/{this.props.id}/{this.state.endpointName}/</code></p>
                        </div>
                        : <div/>
                    }
                    <br/>
                    <br/>
                    <br/>
                    <h3>Your unique ID is <strong>{this.props.id}</strong></h3> 
                    <p>To use this, copy down your unique ID number. <br/> When you make an endpoint above, you can access your endpoint by using your id in the URL.</p>
                    <p>E.g., when you hit <br/><code>https://endpoint-backend.herokuapp.com/{this.props.id}/EndpointName</code><br/> then the JSON response will be the value you put in above.</p>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.endpointsGot 
                        ? 
                        <div>
                            <h4>Found endpoints</h4>
                            {this.state.allEndpoints.map(endpoint => <FoundEndpoint layerOne={endpoint.layerOne} key={endpoint._id} id={endpoint._id}/>)}
                        </div>
                        :
                        <div>
                            <h3>Show all your endpoints</h3>
                            <form onSubmit={this.getAllEndpoints}>
                                <button type="submit">Reveal</button>
                            </form>
                        </div>
                    }
                </div>
                : 
                <div>
                    <br/>
                    <br/>
                    <h2>You need to <a href="/login">log in first</a> create an endpoint.</h2>
                </div>
                }
            </div>
        )
    }
}

export default HomePage;