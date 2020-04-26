import React from "react";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

const FoundEndpoint = (props) => {
    return(
        <div>
            <br/>
            <p>Endpoint route: <code>{backendURL + props.userId + "/" + props.route}</code></p>
            <p>Expected static JSON: {JSON.stringify(props.layerOne[props.route])}</p>
            <form onSubmit={props.deleteEndpoint}>
                <button type="submit">Delete this endpoint?</button>
            </form>
            <br/>
            <br/>
        </div>
    )
}

export default FoundEndpoint;