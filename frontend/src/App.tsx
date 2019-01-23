import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LoginContainer } from './Components/Views/Login/LoginContainer';
import { RegisterContainer } from './Components/Views/Register/RegisterContainer';
import { IndexView } from './Components/Views/Index/IndexView';
import { Header } from './Components/Misc/Header';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Route path="/" exact={true} component={IndexView} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/register" component={RegisterContainer} />
                </div>
            </Router>
        );
    }
}

export default App;
