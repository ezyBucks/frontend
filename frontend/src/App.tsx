import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LoginContainer } from './Components/Views/Login/LoginContainer';
import { RegisterContainer } from './Components/Views/Register/RegisterContainer';
import { IndexView } from './Components/Views/Index/IndexView';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <span style={{marginRight: 'auto'}}>ezyBucks</span>
                        <Button type="primary">
                            <Link to="/">Home</Link>
                        </Button>
                        <Button type="primary">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button type="primary">
                            <Link to="/register">Register</Link>
                        </Button>
                    </header>
                    <div />

                    <Route path="/" exact={true} component={IndexView} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/register" component={RegisterContainer} />
                </div>
            </Router>
        );
    }
}

export default App;
