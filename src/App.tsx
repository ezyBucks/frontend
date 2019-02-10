import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginContainer from './Components/Views/Login/LoginContainer';
import RegisterContainer from './Components/Views/Register/RegisterContainer';
import { IndexView } from './Components/Views/Index/IndexView';
import { Header } from './Components/Common/Header';
import { PrivateRoute } from './Components/Common/PrivateRoute';
import { createStore } from 'redux';
import MainReducer from './Redux/authenticate/reducers';
import { Provider, connect } from 'react-redux';
import { AuthenticatedState } from './Redux/authenticate/types';

const store = createStore(MainReducer);

const privateRoute = () => {
    return <div>This is a private route</div>;
};

const publicRoute = () => {
    return <div>This is a public route</div>;
};

class Main extends Component<{ authenticated: any }> {
    render() {
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
                        isAuthenticated={this.props.authenticated}
                        redirectPath={'/login'}
                    />
                    <Route path="/public" component={publicRoute} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: AuthenticatedState) => {
    return {
        authenticated: state.authenticated
    };
};

const MainApp = connect(mapStateToProps)(Main);

export default () => (
    <Provider store={store}>
        <MainApp />
    </Provider>
);
