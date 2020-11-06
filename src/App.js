import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './EndpointHome';
import AboutPage from './AboutPage';
import NavBar from './NavBar';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import PlanChoiceContainer from './PlanChoiceContainer';
import SuccessPage from './SuccessPage';
import LogoutPage from './LogoutPage';
import ResetPasswordAttempt from './ResetPasswordAttempt';
import ResetPassword from './ResetPassword';
import HelpPage from './HelpPage';
import AccountPage from './AccountPage';
import OwnerPage from './OwnerPage';
import NoMatchPage from './NoMatchPage';
import { loadStripe } from '@stripe/stripe-js';
import NewEndpointPage from './NewEndpointPage';
import AllUserEndpoints from './AllUserEndpoints';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-110417068-6');
ReactGA.pageview(window.location.pathname + window.location.search);
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: "",
      email: null,
      contact: null,
      id: null,
      message: null,
      name: null,
      owner: null,
      isLoaded: false,
      numUsersGot: null,
      users: null,
      planType: null,
      password: null,
      passwordCopy: null,
      isRegistered: null,
      sessionId: null,
      send: false,
    }
  }


  checkForToken = async () => {
    if(localStorage.getItem("token") !== "null"){
      try{
        const targetUrl = backendURL + "auth/verify";
        const getUser = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "POST",
            'credentials': 'same-origin',
            "Authorization": localStorage.getItem("token")
          } 
        });
        const parsedResponse = await getUser.json();
        if(parsedResponse.status === 200){
          await this.setState({
            ...this.state,
            loggedIn: parsedResponse.loggedIn,
            isRegistered: parsedResponse.isRegistered,
            email: parsedResponse.email,
            id: parsedResponse.id,
            name: parsedResponse.name,
            owner: parsedResponse.owner,
            isLoaded: true,
            planType: parsedResponse.planType,
            signupDate: parsedResponse.signupDate,
          })
          console.log('plan type: ' + this.state.planType)
          if(localStorage.getItem("loggedIn") !== "true"){
            localStorage.setItem("loggedIn", true);
          }
        } else if (parsedResponse.status === 500){
          console.log("INTERNAL SERVER ERROR")
        } else if (parsedResponse.status === 404){
          console.log("NO USER FOUND")
          localStorage.setItem("loggedIn", false);
        } else {
          this.setState({
            loggedIn: false,
            email: "",
            isLoaded: true,
          })
        }
      } catch(err){
        console.log("failed to get cookie", err);
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("email", null);
        this.setState({
          loggedIn: false,
          isRegistered: false,
          isLoaded: true,
        })
      }
    } else{
      console.log("else statement hit. JWT doesn't exist yet");
      this.setState({
        loggedIn: false,
        isRegistered: false,
        isLoaded: true,
      })
    }
    return
  }


  componentDidMount = () => {
    this.checkForToken();
  }

  handleInputs = (e) => {
    this.setState({
      ...this.state,
      message: null,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleCheck = async (e) => {
    await this.setState({
      ...this.state,
      planType: e.currentTarget.id,
    })
  };

  fetchCheckoutSession = async () => {
    try {
      const targetUrl = backendURL + 'auth/checkout'
      const shite = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Access-Control-Allow-Origin': targetUrl,
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
        }
      });
      const parsed = shite.json();
      return parsed;
    } catch(err){
      console.log('err: ' + err);
    }
  }

  submitBuyPlan = async (e) => {
    e.preventDefault();
    try {
      const session = await this.fetchCheckoutSession();
      const sessionId = session.sessionId;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
      if(error) {
        alert('error?? ' + error);
        throw new Error(error);
      }
    } catch (err) {
      console.log('err! ' + err)
    }
  }

  submitRegistration = async (e) => {
    e.preventDefault();
    try{
      const targetUrl = backendURL + 'auth/register'
      const createUser = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Access-Control-Allow-Origin': targetUrl,
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
        },
      });
      const parsedResponse = await createUser.json();
      if(parsedResponse.status === 200){
        this.setState({
          isRegistered: true,
          email: parsedResponse.data.email,
          id: parsedResponse.data._id,
        })
        localStorage.setItem("token", parsedResponse.token);
        localStorage.setItem("email", parsedResponse.data.email);
        localStorage.setItem("id", parsedResponse.data._id);
      } else if (parsedResponse.status === 401) {
        const failedRegistration = "Email is already registered.";
        this.setState({
          ...this.state,
          message: failedRegistration,
        });
      } else if (parsedResponse.status === 500){
        console.log("INTERNAL SERVER ERROR")
      }
    }catch(err){
      console.log(err, " error")
    }
  }

  submitLogin = async (e) => {
    e.preventDefault();
    try{
      console.log("submitting login");
      const targetUrl = backendURL  + 'auth/login';
      const loggedUser = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Access-Control-Allow-Origin': targetUrl,
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
        } 
      });
      const parsedLogged = await loggedUser.json();
      if (parsedLogged.status === 200) {
        this.setState({
          isRegistered: true,
          email: parsedLogged.data.email,
          id: parsedLogged.data._id,
        });
        console.log(parsedLogged)
        localStorage.setItem("token", parsedLogged.token);
        localStorage.setItem("email", parsedLogged.data.email);
        localStorage.setItem("id", parsedLogged.data._id);
      } 
      else if (parsedLogged.status === 401) {
        const failedLogin = "Username or password is incorrect.";
        this.setState({
          ...this.state,
          message: failedLogin,
        });
      }
      else if (parsedLogged.status === 500) {
        console.log("INTERNAL SERVER ERROR")
      } else {
        alert("LOGIN FAILED. Response: " + JSON.stringify(parsedLogged));
      }
    }catch(err){
      alert("LOGIN FAILED WITH ERROR: " + err);
    }
  }

  logout = () => {
    console.log("LOGGING OUT")
    localStorage.setItem("loggedIn", false)
    localStorage.setItem("email", null)
    localStorage.setItem("id", null)
    localStorage.setItem("token", null)
    this.setState({
      loggedIn: false,
      isRegistered: false,
      email: "",
      password: "",
      isLoaded: true,
    })
  }

  submitReset = async (e) => {
    e.preventDefault();
    let parsedLogged;
    try{
      console.log("Submitting reset.");
      const targetUrl = backendURL  + 'auth/reset';
      const loggedUser = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          // 'Access-Control-Allow-Origin': targetUrl,
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
          'Access-Control-Allow-Origin': '*',
        } 
      });
      parsedLogged = await loggedUser.json();
      if(parsedLogged.status === 200){
        this.setState({
          ...this.state,
          send: true,
        });
      } 
      else if (parsedLogged.status === 500){
        console.log("INTERNAL SERVER ERROR")
      } else {
        alert("LOGIN FAILED. RESPONSE: ", JSON.stringify(parsedLogged));
      }
    }catch(err){
      console.log(parsedLogged);
    }
  }

  setNewPassword = async (e) => {
    e.preventDefault();
    try{
      console.log("resetting password fr");
      const targetUrl = backendURL  + 'auth/reset/confirm';
      const response = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify({
          id: window.location.pathname.slice(15),
          password: this.state.password
        }),
        headers: {
          'Access-Control-Allow-Origin': targetUrl,
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
        } 
      });
      const parsedResponse = await response.json();
      if(parsedResponse.status === 200){
        this.setState({
          ...this.state,
          send: true,
        });
      } 
    } catch (err) {
      console.log('ERR: ' + err)
    }
  }

  getNumberofUsers = async (e) => {
    e.preventDefault();
    try {
      const targetUrl = backendURL  + 'owner/getUsers';
      const users = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': targetUrl,
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
          "Authorization": localStorage.getItem("token"),
        } 
      });
      const parsedUsers = await users.json();
      this.setState({
        ...this.state,
        users: parsedUsers.data,
        numUsersGot: true,
      })
    } catch(e) {
      console.log('Error: ' + e);
    }
  }

  setToken = (token) => {
    localStorage.setItem("token", token);
  }

  homepage = () => {
    return <HomePage isRegistered={this.state.isRegistered} loggedIn={this.state.loggedIn} id={this.state.id} isLoaded={this.state.isLoaded} />
  }

  newEndpointPage = () => {
    return <NewEndpointPage isRegistered={this.state.isRegistered} loggedIn={this.state.loggedIn} id={this.state.id} isLoaded={this.state.isLoaded}/>
  }

  allEndpointsPage = () => {
    return <AllUserEndpoints isRegistered={this.state.isRegistered} loggedIn={this.state.loggedIn} id={this.state.id} isLoaded={this.state.isLoaded}/>
  }
  
  aboutPage = () => {
    return <AboutPage/>
  }

  loginPage = () => {
    return <LoginContainer isRegistered={this.state.isRegistered} loggedIn={this.state.loggedIn} submitLogin={this.submitLogin} handleInputs={this.handleInputs} message={this.state.message} />
  }

  registerPage = () => {
    return <RegisterContainer isRegistered={this.state.isRegistered} loggedIn={this.state.loggedIn} handleInputs={this.handleInputs} handleCheck={this.handleCheck} submitRegistration={this.submitRegistration} message={this.state.message} planType={this.state.planType} password={this.state.password} passwordCopy={this.state.passwordCopy} />
  }

  planChoicePage = () => {
    return <PlanChoiceContainer isRegistered={this.state.isRegistered} handleCheck={this.handleCheck} submitBuyPlan={this.submitBuyPlan} loggedIn={this.state.loggedIn} submitLogin={this.submitLogin} handleInputs={this.handleInputs} planType={this.state.planType} />
  }

  successPage = (props) => {
    return <SuccessPage {...props} confirmSessionId={this.confirmSessionId} loggedIn={this.state.loggedIn} submitLogin={this.submitLogin} handleInputs={this.handleInputs} handleCheck={this.handleCheck} submitRegistration={this.submitRegistration} message={this.state.message} planType={this.state.planType} password={this.state.password} passwordCopy={this.state.passwordCopy} />
  }
  
  logoutPage = () => {
    return <LogoutPage logout={this.logout}/>
  }

  resetPasswordAttempt = () => {
    return <ResetPasswordAttempt send={this.state.send} submitReset={this.submitReset} handleInputs={this.handleInputs} />
  }

  resetPassword = (props) => {
    return <ResetPassword {...props} setNewPassword={this.setNewPassword} handleInputs={this.handleInputs} password={this.state.password} passwordCopy={this.state.passwordCopy} send={this.state.send} />
  }
  
  helpPage = () => {
    return <HelpPage/>
  }

  accountPage = () => {
    return <AccountPage email={this.state.email} name={this.state.name} owner={this.state.owner} planType={this.state.planType} />
  }

  ownerPage = () => {
    return <OwnerPage email={this.state.email} name={this.state.name} owner={this.state.owner} isLoaded={this.state.isLoaded} getNumberofUsers={this.getNumberofUsers} numUsersGot={this.state.numUsersGot} users={this.state.users} password={this.state.password} passwordCopy={this.state.passwordCopy} />
  }

  NoMatch = () => {
    return <NoMatchPage />
  }

  render(){
    return (
        <div className="App">
          <NavBar isRegistered={this.state.isRegistered} loggedIn={this.state.loggedIn} owner={this.state.owner} />
          <div className="separator" />
          <Switch>
            <Route exact path="/" render={this.homepage}/>
            <Route exact path="/about" render={this.aboutPage}/>
            <Route exact path="/login" render={this.loginPage}/>
            <Route exact path="/logout" render={this.logoutPage}/>
            <Route exact path="/reset" render={this.resetPasswordAttempt}/>
            <Route exact path="/reset/confirm/:id" render={(props) => this.resetPassword(props)}/>
            <Route exact path="/register" render={this.registerPage}/>
            <Route exact path="/plans" render={this.planChoicePage}/>
            <Route exact path="/success/:sessionId" render={this.successPage}/>
            <Route exact path="/routes/new" render={this.newEndpointPage}/>
            <Route exact path="/routes" render={this.allEndpointsPage}/>
            <Route exact path="/help" render={this.helpPage}/>
            <Route exact path="/account" render={this.accountPage}/>
            <Route exact path="/owner" render={this.ownerPage}/>
            <Route render={this.NoMatch} />
          </Switch>
        </div>
    );
  }
}

export default App;