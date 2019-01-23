import * as React from 'react';
import { RegisterView } from './RegisterView';
import { makeRequest } from '../../../lib/fetch';
import { HOST } from '../../../lib/constants';

interface RegisterContainerState {
    email: string;
    password: string;
    repassword: string;
}

export class RegisterContainer extends React.Component<
    {},
    RegisterContainerState
> {
    public constructor(props: {}) {
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
    private handleRegister(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        makeRequest(`${HOST}/signup`, 'POST', this.state);
    }

    public render() {
        return (
            <RegisterView
                onChange={this.handleInputChange}
                submit={this.handleRegister}
            />
        );
    }
}
