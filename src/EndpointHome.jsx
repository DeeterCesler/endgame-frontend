import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import AllUserEndpoints from "./AllUserEndpoints";

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
        });
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
        if (!this.state.endpointName.length) {
            console.log('NONE')
            console.log(this.state.endpointName.length)
            this.setState({
                ...this.state,
                message: "No endpoint name submitted. Add a name for the URL you want to create and try again.",
            })
            success = false;
        } else if(typeof(this.state.endpointValue) === "string"){
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
                { this.props.isLoaded 
                    &&
                    <div>
                    {this.props.loggedIn ?
                        <div>
                            <AllUserEndpoints isRegistered={this.props.isRegistered} loggedIn={this.props.loggedIn} id={this.props.id} isLoaded={this.props.isLoaded}/>
                        </div>
                    : 
                        <div>
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

export default HomePage;