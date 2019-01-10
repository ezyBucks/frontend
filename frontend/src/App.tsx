import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginContainer } from "./Components/Views/Login/LoginContainer";
import { RegisterContainer } from "./Components/Views/Register/RegisterContainer";
import { makeRequest } from "./lib/fetch";

const index = () => <div><button onClick={()=>{makeRequest('http://localhost:8080')}}>This is the index page</button></div>;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h2>ezyBucks</h2>
          </header>
          <div>
            <Button type="primary">
              <Link to="/">Home</Link>
            </Button>
            <Button type="primary">
              <Link to="/login">Login</Link>
            </Button>
            <Button type="primary">
              <Link to="/register">Register</Link>
            </Button>
          </div>

          <Route path="/" exact={true} component={index} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
