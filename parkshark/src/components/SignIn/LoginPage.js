import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import fire from './fire';
import Cookies from "js-cookie";
import 'firebase/auth';
import Login from './Login';
import Home from "../Home/Home";
import Listings from '../Listings/Listings';
import Bookings from '../Bookings/Bookings';
import ListingPage from "../Listings/listingPage"
import Profile from "../Profile/Profile";
import About from "../About/About";
import Navbar2 from "../Navbar/Navbar2";
import './LoginPage.css';
import NewListing from "../Listings/newListingForm";
function LoginPage() {

  //set up the initial states//
  const[user, setUser] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[emailError, setEmailError] = useState('');
  const[passwordError, setPasswordError] = useState('');
  const[hasAccount, setHasAccount] = useState(false);

  //two cleanup functions to clear inputs and error messages
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default: break;
        }
      });


  };

  const createUser = (user) => {
    const body = {
      email: user.email,
      host_bookings_id: [],
      renter_bookings_id: [],
      listings_id: []
    }
    fetch("users/",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
        .then((response) => response.json())
        .then((data) => console.log(data))
  }

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(user_cred => {createUser(user_cred.user)})
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  let dob = new Date();
  dob.setTime(Date.now());
  let userObject = {
    name: user,
    phone: "555-223-4332",
    dob: dob,
    email: emailError,
    host_bookings_id: [],
    renter_bookings_id: [],
    listings_id: [],
  }
  /*fetch("/users", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObject),
  })
      .then(response => response.json())
      .then(data => Cookies.set("userID", data.user)); //TODO: not sure how to get USER ID*/


  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();         //whenever we have a user
        setUser(user);
      }
      else {                   //set User to emtpy string if no user
        setUser("");
      }
    });
  };

  useEffect(() =>{
    authListener()             //listen to events
  }, []);


  return (
    <div className="LoginPage">
      {user ? (
      <div className="App">
        <Router>
        {/* <Navbar loggedIn={fire.auth().currentUser} /> */}
        <Navbar2/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" component={Home} />
            <Route path="/Login" component={LoginPage} />
            <Route path="/Listings" component={Listings} />
            <Route path="/Bookings/:id" component={Bookings} />
            <Route path="/Listing/:id" component={ListingPage}/>
            <Route path="/New" component={NewListing}/>
            <Route path="/About" component={About} />
            <Route path="/Profile" component={Profile} />
          </Switch>
        </Router>
      </div>

      ): (
        <Login //with all possible states
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
      )}
    </div>
  );
}

export default LoginPage;

/*<div className="LoginPage">
      {user ? (
      <div className="App">
        <Router>
        {/* <Navbar loggedIn={fire.auth().currentUser} /> }
        <Navbar2></Navbar2>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" component={Home} />
            <Route path="/Login" component={LoginPage} />
            <Route path="/Listings" component={Listings} />
            <Route path="/About" component={About} />
            <Route path="/Profile" component={Profile} />
          </Switch>
        </Router>
      </div>

      ): (
        <Login //with all possible states
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
      )}
    </div> */