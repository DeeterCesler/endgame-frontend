import React from "react";

const AccountPage = (props) => {
    return(
        <div>
            <div className="mini-spacer"/>
            <div className="mini-spacer"/>
            <h1>Account</h1>
            <br/>
            <div className="container">
                <div className="row text-left">
                    <div className="col-md" />
                    <div className="col-md light-gray">
                        <p>
                            your email: 
                            <br/> 
                            <strong>{props.email}</strong>
                        </p>
                        <p>
                            your name: 
                            <br/> 
                            <strong>{props.name}</strong>
                        </p>
                        <p>your account type: 
                            <br/> 
                            <strong>{props.planType}</strong>
                        </p>
                    </div>
                    <div className="col-md" />
                </div>
                <br/>
                <div className="row">
                    { props.owner ? <a className="col" href="/owner">Go to owner page</a> : <div/> }
                </div>
            </div>
            <br/>
            <footer>
                Love Fetchspot? Hate it? <a href="mailto:deeter.cesler@gmail.com">Send me an email!</a> 
                <br/>
                I'm always looking to keep the good things and fix what's broken.
            </footer>
            <div className="mini-spacer" />
            <div className="mini-spacer" />
        </div>
    )
}

export default AccountPage;