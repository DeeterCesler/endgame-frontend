import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './EndpointHome';
import AboutPage from './AboutPage';
import NewContact from './NewContact/index';
import AllContactsContainer from './AllContactsContainer';
import NavBar from './NavBar';
import LoginRegisterContainer from './LoginRegisterContainer';
import LogoutPage from './LogoutPage';
import HelpPage from './HelpPage';

const backendURL = process.env.REACT_APP_BACKEND_SERVER_ADDRESS

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: "",
      email: null,
      contact: null,
      id: null,
      test: "hey"
    }
  }


  checkForCookie = async () => {
    console.log("getting token: ", localStorage.getItem("token"))
    if(localStorage.getItem("token") !== "null"){
      try{
        const targetUrl = backendURL + "auth/verify";
        const getUser = await fetch(targetUrl, {
          method: 'POST',
          // body: localStorage.token,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "POST",
            'credentials': 'same-origin',
            "Authorization": localStorage.getItem("token")
          } 
        });
        const parsedResponse = await getUser.json();
        console.log("parsedREsponse: ", parsedResponse);
        if(parsedResponse.status === 200){
          this.setState({
            loggedIn: true,
            email: parsedResponse.email,
            id: parsedResponse.id
          })
          console.log("RETRIEVED ID: " + this.state.id)
          if(localStorage.getItem("loggedIn") !== "true"){
            localStorage.setItem("loggedIn", true);
          }
          // localStorage.setItem("email", parsedResponse.);
        } else if (parsedResponse.status === 500){
          console.log("INTERNAL SERVER ERROR")
        } else if (parsedResponse.status === 404){
          console.log("NO USER FOUND")
          localStorage.setItem("loggedIn", false);
        } else {
          this.setState({
            loggedIn: false,
            email: ""
          })
        }
      } catch(err){
        console.log("failed to get cookie", err);
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("email", null);
        // localStorage.setItem("token", null);
        this.setState({
          loggedIn: false
        })
      }
    } else{
      console.log("else statement hit. JWT doesn't exist yet");
    }
    return
  }


  componentDidMount(){
    this.checkForCookie();
  }

  handleInputs = (e) => {
    this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value
    })
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
        } 
      });
      const parsedResponse = await createUser.json();
      if(parsedResponse.status === 200){
        this.setState({
          loggedIn: true,
          email: parsedResponse.data.email,
          id: parsedResponse.data._id
        })
        localStorage.setItem("token", parsedResponse.token);
        localStorage.setItem("email", parsedResponse.data.email);
        localStorage.setItem("id", parsedResponse.data._id);
      } else if (parsedResponse.status === 500){
        console.log("INTERNAL SERVER ERROR")
      }
    }catch(err){
      console.log(err, " error")
    }
  }

  submitLogin = async (e) => {
    e.preventDefault();
    let parsedLogged;
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
      parsedLogged = await loggedUser.json();
      // res => setToken(res.token);
      if(parsedLogged.status === 200){
        this.setState({
          loggedIn: true,
          email: parsedLogged.data.email,
          id: parsedLogged.data._id
        });
        console.log(parsedLogged)
        localStorage.setItem("token", parsedLogged.token);
        localStorage.setItem("email", parsedLogged.data.email);
        localStorage.setItem("id", parsedLogged.data._id);
      } 
      else if (parsedLogged.status === 500){
        console.log("INTERNAL SERVER ERROR")
      } else {
        console.log("parsed log and shiiiiit:", parsedLogged);
        alert("LOGIN FAILED")
      }
    }catch(err){
      // console.log("parsed: ", parsedLogged);
      console.log(parsedLogged);
      console.log("Error, boi: ", err)
      alert("LOGIN FAILED WITH ERROR: " + err)
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
      email: "",
      password: ""
    })
  }

  setToken = (token) => {
    localStorage.setItem("token", token);
  }

  homepage = () => {
    return <HomePage loggedIn={this.state.loggedIn} id={this.state.id} />
  }
  
  aboutPage = () => {
    return <AboutPage/>
  }

  newContact = () => {
    return <NewContact/>
  }
  
  allContacts = () => {
    return this.state.email != null
    ? <AllContactsContainer email={this.state.email}/>
    : 
    <div className="black-floater">
        <div className="spacer">.</div>
        <p>
          You need to log in to view your contacts.
        </p>
      </div>
  }

  loginRegisterPage = () => {
    return <LoginRegisterContainer test={this.state.test} loggedIn={this.state.loggedIn} submitLogin={this.submitLogin} handleInputs={this.handleInputs} submitRegistration={this.submitRegistration}/>
  }
  
  logoutPage = () => {
    return <LogoutPage logout={this.logout}/>
  }
  
  helpPage = () => {
    return <HelpPage/>
  }

  render(){
    return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route exact path="/" render={this.homepage}/>
            <Route exact path="/about" render={this.aboutPage}/>
            <Route exact path="/login" render={this.loginRegisterPage}/>
            <Route exact path="/logout" render={this.logoutPage}/>
            <Route exact path="/register" render={this.loginRegisterPage}/>
            <Route exact path="/routes/new" render={this.routesNew}/>
            <Route exact path="/routes/all" render={this.routesAll}/>
            <Route exact path="/help" render={this.helpPage}/>
          </Switch>
        </div>
    );
  }
}

export default App;