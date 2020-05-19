import React from "react";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

const FoundEndpoint = (props) => {
    return(
        <div className="text-left container found-endpoint">
            <br/>
            <p>Endpoint route: <a target="_blank" href={backendURL + props.userId + "/" + props.route}><code>{backendURL + props.userId + "/" + props.route}</code></a></p>
            <p>Expected static JSON:  <code>{JSON.stringify(props.layerOne[props.route]).slice(0, 50)}...</code></p>
            <form onSubmit={props.deleteEndpoint}>
                <button className="input-small" type="submit">Delete this endpoint</button>
            </form>
            <br/>
            <br/>
        </div>
    )
}

export default FoundEndpoint;