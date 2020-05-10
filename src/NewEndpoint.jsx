import React, {Component} from "react";
import { Alert } from "reactstrap";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

const defaultText = `{
    "yourKeyHere": "yourValueHere",
    "wantABoolean": true,
    "valueNumber": 3,
    "nestedObject": {
        "sampleKey":"sampleValue"
    }
}`

class NewEndpoint extends Component {
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

    render(){
        return (
            <div>
                <br/>
                <br/>
                <h1>create an endpoint</h1>
                <form onSubmit={this.props.submitEndpoint}>
                    <br/>
                    <br/>
                    <h6>Choose the name of the endpoint (this is what's actually in the URL)</h6>
                    <input onChange={this.props.handleInputs} className="input" name="endpointName" type="text" placeholder='endpoint name, e.g. "/endpoint" or even "/v1/nested/endpoints"'/>
                    <br/>
                    <br/>
                    <h6>Input whatever sample data you want (in JSON!)</h6>
                    <code className="language-javascript"><textarea onChange={this.props.handleInputs} className="input json" name="endpointValue" type="textarea" placeholder="The response you want back (in JSON)" defaultValue={defaultText} maxLength="2000"/></code>
                    <br/>
                    <button className="input" type="submit">Submit</button>
                </form>
                <br/>
                <div className="container">
                    { this.props.message ? <Alert color="danger">{this.props.message}</Alert> : <div/> }
                </div>
                <br/>
                {
                    this.state.response != null ?
                    <div>
                        <p>Endpoint successfully submitted.</p>
                        <p>Your new endpoint can be hit at <br/><code>{backendURL}{this.props.id}/{this.state.endpointName}</code></p>
                    </div>
                    : <div/>
                }
                <h3>Your unique ID is <strong>{this.props.id}</strong></h3> 
                <p>To use this, copy down your unique ID number. <br/> When you make an endpoint above, you can access your endpoint by using your id in the URL.</p>
                <p>E.g., when you hit <br/><code>{backendURL}{this.props.id}/EndpointName</code><br/> then the JSON response will be the value you put in above.</p>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default NewEndpoint;