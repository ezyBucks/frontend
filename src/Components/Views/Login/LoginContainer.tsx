import * as React from 'react';
import { LoginView } from './LoginView';
import { makeRequest } from '../../../lib/fetch';
import { HOST } from '../../../lib/constants';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setAuthenticated } from '../../../Redux/authenticate/actions';
import { Dispatch } from 'redux';
import { AuthenticatedState } from '../../../Redux/authenticate/types';

interface LoginContainerProps {
    authenticated: boolean;
    setAuthenticated: typeof setAuthenticated;
}

interface LoginContainerState {
    email: string;
    password: string;
}

/**
 * Class to handle the logic for the login page
 */
class LoginContainer extends React.Component<
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
            this.props.setAuthenticated(true);
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
const mapStateToProps = (state: AuthenticatedState) => {
    return {
        authenticated: state.authenticated
    };
};

/**
 * Map the setAuthenticated action creator to props to use in the container
 * @param dispatch Redux dispatch function
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setAuthenticated: (value: boolean) => dispatch(setAuthenticated(value))
    };
};

/**
 * Map the redux store state and actionCreators to the components props
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
