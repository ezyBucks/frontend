import * as React from 'react';
import { LoginView } from './LoginView';
import { makeRequest } from '../../../lib/fetch';
import { HOST } from '../../../lib/constants';
import { Redirect } from 'react-router';

import {connect} from 'react-redux';
import {setAuthenticated} from '../../../Redux/authenticate/actions';

interface LoginContainerProps {
    authenticated: boolean
    callback: () => void;
    authenticate: any;
}

interface LoginContainerState {
    email: string;
    password: string;
    isAuthenticated: boolean;
}

/**
 * Class to handle the logic for the login page
 */
class LoginContainerM extends React.Component<LoginContainerProps, LoginContainerState> {
    constructor(props: LoginContainerProps){
        super(props);

        this.state = { email: '', password: '', isAuthenticated: this.props.authenticated};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    /**
     * Handle the input changes in the child component
     *
     * @param e Event passed from onChange event
     */
    private handleInputChange(e: React.SyntheticEvent<any>) {
        const id = e.currentTarget.id;
        const value = e.currentTarget.value || '';
        switch (id) {
            case 'email':
                this.setState({ email: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
        }
    }

    /**
     * Handle the submit event from the form. This should trigger a POST to the api to fetch the login JWT
     *
     * @param e Event passed from the onSubmit event
     */
    private async handleLogin(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        this.props.authenticate(true);
        console.log('POST to the api');
        console.log(this.state);
        const response = await makeRequest(
            `${HOST}/signin`,
            'POST',
            this.state
        );

        const result = await response.json();
        console.log(result);

        if (result.success) {
            localStorage.setItem('authenticated', 'true');
            this.setState({ isAuthenticated: true });
        }
    }

    public render() {
        console.log('LoginContainer Rendered');
        if (!this.state.isAuthenticated) {
            return (
                <LoginView
                    onChange={this.handleInputChange}
                    submit={this.handleLogin}
                />
            );
        } else {
            return <Redirect to="/" />;
        }
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        authenticate: (value:boolean) => {dispatch(setAuthenticated(value))}
    }
}

export const LoginContainer = connect(undefined, mapDispatchToProps)(LoginContainerM);
