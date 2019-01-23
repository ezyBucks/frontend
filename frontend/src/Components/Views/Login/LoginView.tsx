import * as React from 'react';
import { ControlledInput } from '../../Misc/ControlledInput';
import { Icon, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface LoginViewProps {
    /** Function to handle changes of both user inputs in the view */
    onChange: (e: React.SyntheticEvent) => void;
    /** Function to handle submitting the login */
    submit: (e: React.SyntheticEvent) => void;
}

const ContainerDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const PaddedDiv = styled.div({
    paddingBottom: '10px'
});

/**
 * Class to render the view for the login page. This is a Stateless Function Component as it should not have any state, and does not need the lifecycle methods,
 * which should help performance
 */
export const LoginView: React.SFC<LoginViewProps> = props => {
    return (
        <ContainerDiv>
            <Card style={{ width: '600px', margin: '50px' }}>
                <form onSubmit={props.submit}>
                    <PaddedDiv>
                        <ControlledInput
                            onChange={props.onChange}
                            prefix={<Icon type="user" />}
                            placeholder="Enter your username"
                            id="email"
                            style={{ height: '45px' }}
                        />
                    </PaddedDiv>
                    <PaddedDiv>
                        <ControlledInput
                            onChange={props.onChange}
                            placeholder="Please enter your password"
                            type="password"
                            id="password"
                            style={{ height: '45px' }}
                        />
                    </PaddedDiv>
                    <Button
                        htmlType="submit"
                        type="primary"
                        onClick={props.submit}
                        style={{ margin: '5px' }}
                    >
                        Login
                    </Button>
                </form>
            </Card>
            <div style={{ margin: '5px' }}>
                Need an account? Click <Link to="/register">here</Link> to
                register
            </div>
        </ContainerDiv>
    );
};
