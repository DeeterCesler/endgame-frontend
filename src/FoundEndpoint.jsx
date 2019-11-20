import React from "react";

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS


const FoundEndpoint = (props) => {

    async function deleteEndpoint(e){
        // e.preventDefault();
        try{
            console.log("DELETING ENDPOINT")
            const submittedEndpoint = await fetch(backendURL + props.id, {
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

    return(
        <div>
            <br/>
            <p>Endpoint route: {JSON.stringify(props.layerOne)}</p>
            <form onSubmit={deleteEndpoint}>
                <button type="submit">Delete this endpoint?</button>
            </form>
            <br/>
            <br/>
        </div>
    )
}

export default FoundEndpoint;