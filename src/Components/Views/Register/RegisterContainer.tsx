import * as React from 'react';
import { RegisterView } from './RegisterView';
import { makeRequest } from '../../../lib/fetch';
import { HOST } from '../../../lib/constants';
import { Redirect } from 'react-router';
import { setAuthenticated } from '../../../store/authenticate/actions';
import { connect } from 'react-redux';
import { AuthenticatedState } from '../../../store/authenticate/types';
import { Dispatch } from 'redux';
import { AppState } from '../../../store/rootReducer';

interface RegisterContainerProps {
    authenticated: boolean;
    setAuthenticated: typeof setAuthenticated;
}

interface RegisterContainerState {
    email: string;
    password: string;
    repassword: string;
}

class RegisterContainer extends React.Component<
    RegisterContainerProps,
    RegisterContainerState
> {
    public constructor(props: RegisterContainerProps) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
            case 'repassword':
                this.setState({ repassword: value });
                break;
        }
    }

    /**
     * Handle the submit event from the form. This should trigger a POST to the api to fetch the login JWT
     *
     * @param e Event passed from the onSubmit event
     */
    private async handleRegister(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        const response = await makeRequest(
            `${HOST}/signup`,
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
                <RegisterView
                    onChange={this.handleInputChange}
                    submit={this.handleRegister}
                />
            );
        } else {
            return <Redirect to="/" />;
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        authenticated: state.authenticate.authenticated
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setAuthenticated: (value: boolean) => dispatch(setAuthenticated(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
