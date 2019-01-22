import * as React from 'react';
import { ControlledInput } from '../../Misc/ControlledInput';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

interface RegisterViewProps {
    /** Function to handle changes of both user inputs in the view */
    onChange: (e: React.SyntheticEvent) => void;
    /** Function to handle submitting the login */
    submit: (e: React.SyntheticEvent) => void;
}

export const RegisterView: React.SFC<RegisterViewProps> = props => {
    return (
        <React.Fragment>
            <form onSubmit={props.submit}>
                <div>
                    <ControlledInput
                        onChange={props.onChange}
                        prefix={<Icon type="user" />}
                        placeholder="Enter an email address"
                        id="email"
                    />
                </div>
                <div>
                    <ControlledInput
                        onChange={props.onChange}
                        placeholder="Please enter a password"
                        type="password"
                        id="password"
                    />
                </div>
                <div>
                    <ControlledInput
                        onChange={props.onChange}
                        placeholder="Please reenter the password"
                        type="password"
                        id="repassword"
                    />
                </div>
                <Button
                    htmlType="submit"
                    type="primary"
                    onClick={props.submit}
                    style={{ margin: '5px' }}
                >
                    Register
                </Button>
            </form>
            <div style={{ margin: '5px' }}>
                Already have an account? Click <Link to="/login">here</Link> to
                login
            </div>
        </React.Fragment>
    );
};
