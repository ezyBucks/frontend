import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginContainer } from './Components/Views/Login/LoginContainer';
import { RegisterContainer } from './Components/Views/Register/RegisterContainer';
import { IndexView } from './Components/Views/Index/IndexView';
import { Header } from './Components/Misc/Header';
import { PrivateRoute } from './Components/Misc/PrivateRoute';

const privateRoute = () => {
    return <div>This is a private route</div>;
};

const publicRoute = () => {
    return <div>This is a public route</div>;
};

class App extends Component {
    private shouldBeState = false;

    private updateAll(){
        this.shouldBeState = true;
        this.forceUpdate();
    }

    render() {
        const isAuthenticated = localStorage.getItem('authenticated');
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Route path="/" exact={true} component={IndexView} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/register" component={RegisterContainer} />
                    <PrivateRoute
                        path="/private"
                        component={privateRoute}
                        isAuthenticated={!!isAuthenticated}
                        redirectPath={'/login'}
                    />
                    <Route path="/public" component={publicRoute} />
                </div>
            </Router>
        );
    }
}

export default App;
