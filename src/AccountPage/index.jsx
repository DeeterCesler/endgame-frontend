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
                        <span>
                            email
                            <br/> 
                            <strong>{props.email}</strong>
                        </span>
                        <br/> 
                        <br/> 
                        <span>
                            name
                            <br/> 
                            <strong>{props.name}</strong>
                        </span>
                        <br/> 
                        <br/> 
                        <span>
                            account type
                            <br/> 
                            <strong>{props.planType}</strong>
                        </span>
                        <br/> 
                        <br/> 
                        <span className="forgot">
                            <a href="/reset">Reset password</a>
                        </span>
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