import React from "react";
import './App.css';

const AboutPage = () => {

    return (
        <div className="background">
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>About FollowUp</h1>
            <br/>
            <div className="explainer">
                {/* <p>Have you ever forgotten to follow up with a new connection?</p>
                <p><strong>Never forget again.</strong> Networker Pro sends you timed reminders to follow up with contacts you’ve made.</p>
                <p>By using the principles found in the Ebbinghaus Forgetting curve, Networker Pro sends you timed reminders to reach out to new contacts you've made. The timing ensures you make reconnect at just the right time, creating longer and more meaningful connections.</p> */}
                <p>You meet someone at the coffee shop, job fair, or happy hour. You take their card, and maybe add them on social media.</p>
                <p>Nice job. <b>But did you remember to follow up?</b> Three months from now, is the contact still "warm" or did you let it go cold?</p>
                <p><strong>Never forget again.</strong> Create automated reminders for every contact you meet, and maximize your network's potential.</p>
                <div className="cta"><a href="/register">Get Started</a></div>
                <br/>
                <br/>
            </div>
        </div>
    )
}

export default AboutPage;