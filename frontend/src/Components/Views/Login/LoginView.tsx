import * as React from 'react';
import { ControlledInput } from '../../Misc/ControlledInput';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

interface LoginViewProps {
    /** Function to handle changes of both user inputs in the view */
    onChange: (e: React.SyntheticEvent) => void;
    /** Function to handle submitting the login */
    submit: (e: React.SyntheticEvent) => void;
}

/**
 * Class to render the view for the login page. This is a Stateless Function Component as it should not have any state, and does not need the lifecycle methods,
 * which should help performance
 */
export const LoginView: React.SFC<LoginViewProps> = props => {
    return (
        <React.Fragment>
            <form onSubmit={props.submit}>
                <div>
                    <ControlledInput
                        onChange={props.onChange}
                        prefix={<Icon type="user" />}
                        placeholder="Enter your username"
                        id="email"
                    />
                </div>
                <div>
                    <ControlledInput
                        onChange={props.onChange}
                        placeholder="Please enter your password"
                        type="password"
                        id="password"
                    />
                </div>
                <Button
                    htmlType="submit"
                    type="primary"
                    onClick={props.submit}
                    style={{ margin: '5px' }}
                >
                    Login
                </Button>
            </form>
            <div style={{ margin: '5px' }}>
                Need an account? Click <Link to='/register'>here</Link> to register
            </div>
        </React.Fragment>
    );
};
