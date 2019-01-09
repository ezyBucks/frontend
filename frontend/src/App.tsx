import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const login = () => <div>This is the login page</div>;
const index = () => <div>This is the index page</div>;

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
          </div>

        <Route path="/" exact={true} component={index} />
        <Route path="/login" component={login} />
        </div>
      </Router>
    );
  }
}

export default App;
