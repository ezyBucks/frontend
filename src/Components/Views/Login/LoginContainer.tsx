import * as React from 'react';
import { LoginView } from './LoginView';
import { makeRequest } from '../../../lib/fetch';
import { HOST } from '../../../lib/constants';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setAuthenticated } from '../../../store/authenticate/actions';
import { Dispatch } from 'redux';
import { AppState } from '../../../store/rootReducer';
import { User } from '../../../types/User';
import { setUser } from '../../../store/user/actions';

interface LoginContainerProps {
    authenticated: boolean;
    setAuthenticated: typeof setAuthenticated;
    setUser: typeof setUser;
}

interface LoginContainerState {
    email: string;
    password: string;
}

/**
 * Class to handle the logic for the login page
 */
export class LoginContainer extends React.Component<
    LoginContainerProps,
    LoginContainerState
> {
    constructor(props: LoginContainerProps) {
        super(props);

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
        console.log(this.state);
        const response = await makeRequest(
            `${HOST}/signin`,
            'POST',
            this.state
        );

        const result = await response.json();
        console.log(result);

        if (result.success) {
            this.props.setAuthenticated(true);
            this.props.setUser(result.user);
        }
    }

    public render() {
        if (!this.props.authenticated) {
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

/**
 * Map the redux store to the containers props
 * @param state Store for the authentication
 */
const mapStateToProps = (state: AppState) => {
    return {
        authenticated: state.authenticate.authenticated
    };
};

/**
 * Map the setAuthenticated action creator to props to use in the container
 * @param dispatch Redux dispatch function
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setAuthenticated: (value: boolean) => dispatch(setAuthenticated(value)),
        setUser: (value: User) => dispatch(setUser(value)),
    };
};

/**
 * Map the redux store state and actionCreators to the components props
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
