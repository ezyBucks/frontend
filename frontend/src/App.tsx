import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginContainer } from './Components/Views/Login/LoginContainer';
import { RegisterContainer } from './Components/Views/Register/RegisterContainer';
import { IndexView } from './Components/Views/Index/IndexView';
import { Header } from './Components/Misc/Header';
import { PrivateRoute } from './Components/Misc/PrivateRoute';
import { createStore } from 'redux';
import MainReducer from './Redux/Reducers/Reducers';
import { Provider, connect } from 'react-redux';

const store = createStore(MainReducer);

console.log('Store is: ', store.getState());

const privateRoute = () => {
    return <div>This is a private route</div>;
};

const publicRoute = () => {
    return <div>This is a public route</div>;
};

const mapStateToProps = (state: any) => {
    return {
        authenticated: state.authenticated
    };
};

class Main extends Component <{authenticated: any}>{
    render() {
        console.log('Auth state is', this.props.authenticated);
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
                        isAuthenticated={false}
                        redirectPath={'/login'}
                    />
                    <Route path="/public" component={publicRoute} />
                </div>
            </Router>
        );
    }
}

const MainApp = connect(mapStateToProps)(Main);

export default () => (
    <Provider store={store}>
        <MainApp />
    </Provider>
);
