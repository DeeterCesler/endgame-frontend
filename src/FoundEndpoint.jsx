import React from "react";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

const FoundEndpoint = (props) => {
    // console.log("THIS ENDPOINT HING: " + props.endpoint.layerOne)

    async function deleteEndpoint(e){
        // e.preventDefault();
        try{
            console.log("DELETING ENDPOINT")
            const submittedEndpoint = await fetch(backendURL + props.routeId, {
                method: "DELETE",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
                    // 'Access-Control-Allow-Headers': "POST",
                    // 'credentials': 'same-origin',
                }
            })

        } catch(error){
            console.log(error);
        }
    }

    // for(key in props.endpoint)

    return(
        <div>
            <br/>
            <p>Endpoint route: <code>{backendURL + props.userId + "/" + props.route}</code></p>
            <p>Expected static JSON: {JSON.stringify(props.layerOne[props.route])}</p>
            <form onSubmit={deleteEndpoint}>
                <button type="submit">Delete this endpoint?</button>
            </form>
            <br/>
            <br/>
        </div>
    )
}

export default FoundEndpoint;