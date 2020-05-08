import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
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
          [e.currentTarget.name]: e.currentTarget.value,
          message: null,
          endpointsGot: false,
        })
        console.log(this.state.endpointValue)
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

    clearSlashPrefix = async () => {
        if(this.state.endpointName[0] === "/") {
            const correctedName = await this.state.endpointName.slice(1);
            await this.setState({
                endpointName: correctedName
            })
            await this.clearSlashPrefix();
        }
    }

    submitEndpoint = async (e) => {
        e.preventDefault();
        await this.clearSlashPrefix();
        /* 
        *  This if-check is just in case someone double-submits two endpoints without 
        *  changing the value, it prevents an error from trying to parse something
        *  that's already parsed.
        */
       let success;
        if(typeof(this.state.endpointValue) === "string"){
            try {
                this.state.endpointValue = JSON.parse(this.state.endpointValue); // this is to prevent from getting double Stringified later on
                success = true;
                if (!this.state.endpointName.length) {
                    throw Error('Empty URL submitted.');
                }
            } catch (err) {
                console.log('this shite no parsing');
                this.setState({
                    ...this.state,
                    message: "It looks like that wasn't JSON. Please look it over and try again.",
                })
            }
        }
        
        if (!this.state.endpointName.length) {
            this.setState({
                ...this.state,
                message: "No endpoint name submitted. Add a name for the URL you want to create and try again.",
            })
            success = false;
        }
        

        if (success) {
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
                if (parsedResponse.status === 200) {
                    this.setState({
                        ...this.state,
                        response: parsedResponse,
                        endpointsGot: false,
                    })
                } else if (parsedResponse.status === 500) {
                    this.setState({
                        ...this.state,
                        message: parsedResponse.message,
                        endpointsGot: false,
                    })
                }
            } catch(error){
                console.log(error);
            }
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
                        <code className="language-javascript"><textarea onChange={this.handleInputs} className="input json" name="endpointValue" type="textarea" placeholder="The response you want back (in JSON)" defaultValue={defaultText} maxLength="2000"/></code>
                        <br/>
                        <button className="input" type="submit">Submit</button>
                    </form>
                    <br/>
                    <div className="container">
                        { this.state.message ? <Alert color="danger">{this.state.message}</Alert> : <div/> }
                    </div>
                    <br/>
                    {
                        this.state.response != null ?
                        <div>
                            <p>Endpoint successfully submitted.</p>
                            <p>Your new endpoint can be hit at <br/><code>{backendURL}{this.props.id}/{this.state.endpointName}/</code></p>
                        </div>
                        : <div/>
                    }
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
                            {this.state.allEndpoints.map(endpoint => <FoundEndpoint layerOne={endpoint.layerOne} key={endpoint._id} userId={this.props.id} routeId={endpoint._id} route={Object.keys(endpoint.layerOne)[0]} deleteEndpoint={(e) => {this.deleteEndpoint(e, endpoint)}} />)}
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
                <div>
                    {this.props.isRegistered && <Redirect to="/plans"/> }
                    {!this.props.isRegistered && <Redirect to="/register"/>}
                </div>
                }
            </div>
        )
    }
}

export default HomePage;