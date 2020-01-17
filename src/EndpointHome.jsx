import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import FoundEndpoint from "./FoundEndpoint";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

const defaultText = `{
    "yourKeyHere": "yourValueHere",
    "wantABoolean": true,
    "valueNumber": 3,
    "nestedObject": {
        "sampleKey":"sampleValue"
    }
}`

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            endpointName: "",
            endpointValue: defaultText,
            response: null,
            endpointsGot: false,
            allEndpoints: []
        }
    }
    
    handleInputs = (e) => {
        this.setState({
          ...this.state,
          response: null,
          [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(this.state.endpointValue)
    }

    submitEndpoint = async (e) => {
        e.preventDefault();
        if(this.state.endpointName[0] === "/") {
            const correctedName = await this.state.endpointName.slice(1);
            await this.setState({
                endpointName: correctedName
            })
        }
        /* 
        *  This if-check is just in case someone double-submits two endpoints without 
        *  changing the value, it prevents an error from trying to parse something
        *  that's already parsed.
        */
        if(typeof(this.state.endpointValue) === "string"){
            this.state.endpointValue = JSON.parse(this.state.endpointValue); // this is to prevent from getting double Stringified later on
        }

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
            this.setState({
                response: parsedResponse,
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
                {this.props.loggedIn ?
                <div>
                    <br/>
                    <br/>
                    <h1>create an endpoint</h1>
                    <form onSubmit={this.submitEndpoint}>
                        <br/>
                        <br/>
                        <h6>Choose the name of the endpoint (this is what's actually in the URL)</h6>
                        <input onChange={this.handleInputs} className="input" name="endpointName" type="text" placeholder='endpoint name, e.g. "/endpoint" or even "/v1/nested/endpoints"'/>
                        <br/>
                        <br/>
                        <h6>Input whatever sample data you want (in JSON!)</h6>
                        <textarea onChange={this.handleInputs} className="input json" name="endpointValue" type="textarea" placeholder="The response you want back (in JSON)" defaultValue={defaultText}/>
                        <br/>
                        <button className="input" type="submit">Submit</button>
                    </form>
                    <br/>
                    {
                        this.state.response != null ?
                        <div>
                            <p>Endpoint successfully submitted.</p>
                            <p>Your new endpoint can be hit at <br/><code>{backendURL}{this.props.id}/{this.state.endpointName}/</code></p>
                        </div>
                        : <div/>
                    }
                    <br/>
                    <br/>
                    <br/>
                    <h3>Your unique ID is <strong>{this.props.id}</strong></h3> 
                    <p>To use this, copy down your unique ID number. <br/> When you make an endpoint above, you can access your endpoint by using your id in the URL.</p>
                    <p>E.g., when you hit <br/><code>{backendURL}{this.props.id}/EndpointName</code><br/> then the JSON response will be the value you put in above.</p>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.endpointsGot 
                        ? 
                        <div>
                            <h4>Found endpoints</h4>
                            {this.state.allEndpoints.map(endpoint => <FoundEndpoint layerOne={endpoint.layerOne} key={endpoint._id} userId={this.props.id} routeId={endpoint._id} route={Object.keys(endpoint.layerOne)[0]}/>)}
                        </div>
                        :
                        <div>
                            <h3>Show all your endpoints</h3>
                            <form onSubmit={this.getAllEndpoints}>
                                <button type="submit">Reveal</button>
                            </form>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    }
                </div>
                : 
                <Redirect to="/login"/>
                }
            </div>
        )
    }
}

export default HomePage;