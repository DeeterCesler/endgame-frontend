import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './EndpointHome';
import AboutPage from './AboutPage';
import NavBar from './NavBar';
import LoginRegisterContainer from './LoginRegisterContainer';
import LogoutPage from './LogoutPage';
import ResetPasswordAttempt from './ResetPasswordAttempt';
import ResetPassword from './ResetPassword';
import HelpPage from './HelpPage';
import AccountPage from './AccountPage';
import OwnerPage from './OwnerPage';

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
            ...this.state,
            loggedIn: true,
            email: parsedResponse.email,
            id: parsedResponse.id,
            name: parsedResponse.name,
            owner: parsedResponse.owner,
            isLoaded: true,
          })
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
      message: null,
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
      if (parsedLogged.status === 200) {
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

  submitReset = async (e) => {
    e.preventDefault();
    let parsedLogged;
    try{
      console.log("submitting reset (maybe)");
      const targetUrl = backendURL  + 'auth/reset';
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
        console.log(parsedLogged)
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
    }
  }

  setNewPassword = async (e) => {
    e.preventDefault();
    try{
      console.log("resetting password fr");
      const targetUrl = backendURL  + 'auth/reset/confirm';
      const newPass = await fetch(targetUrl, {
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
    } catch (err) {
      console.log('ERR: ' + err)
    }
  }

  getNumberofUsers = async (e) => {
    e.preventDefault();
    try {
      console.log('Getting total # of users.');
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
      console.log('users: ' + JSON.stringify(parsedUsers.data))
      // parsedUsers.data.map((user) => {
      //   if(user.endpoints) {
      //     console.log('HEEEEELP ' + JSON.stringify(user.endpoints.length))
      //   }
      // })
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
    return <HomePage loggedIn={this.state.loggedIn} id={this.state.id} />
  }
  
  aboutPage = () => {
    return <AboutPage/>
  }

  loginRegisterPage = () => {
    return <LoginRegisterContainer loggedIn={this.state.loggedIn} submitLogin={this.submitLogin} handleInputs={this.handleInputs} submitRegistration={this.submitRegistration} message={this.state.message} />
  }
  
  logoutPage = () => {
    return <LogoutPage logout={this.logout}/>
  }

  resetPasswordAttempt = () => {
    return <ResetPasswordAttempt submitReset={this.submitReset} handleInputs={this.handleInputs} />
  }

  resetPassword = (props) => {
    return <ResetPassword {...props} setNewPassword={this.setNewPassword} handleInputs={this.handleInputs} />
  }
  
  helpPage = () => {
    return <HelpPage/>
  }

  accountPage = () => {
    return <AccountPage email={this.state.email} name={this.state.name} owner={this.state.owner} />
  }

  ownerPage = () => {
    return <OwnerPage email={this.state.email} name={this.state.name} owner={this.state.owner} isLoaded={this.state.isLoaded} getNumberofUsers={this.getNumberofUsers} numUsersGot={this.state.numUsersGot} users={this.state.users} />
  }

  render(){
    return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} owner={this.state.owner} />
          <Switch>
            <Route exact path="/" render={this.homepage}/>
            <Route exact path="/about" render={this.aboutPage}/>
            <Route exact path="/login" render={this.loginRegisterPage}/>
            <Route exact path="/logout" render={this.logoutPage}/>
            <Route exact path="/reset" render={this.resetPasswordAttempt}/>
            <Route exact path="/reset/confirm/:id" render={(props) => this.resetPassword(props)}/>
            <Route exact path="/register" render={this.loginRegisterPage}/>
            <Route exact path="/routes/new" render={this.routesNew}/>
            <Route exact path="/routes/all" render={this.routesAll}/>
            <Route exact path="/help" render={this.helpPage}/>
            <Route exact path="/account" render={this.accountPage}/>
            <Route exact path="/owner" render={this.ownerPage}/>
          </Switch>
        </div>
    );
  }
}

export default App;