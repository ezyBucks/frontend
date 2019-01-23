import * as React from 'react';
import { ControlledInput } from '../../Misc/ControlledInput';
import { Icon, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { ContainerDiv, InputCard } from '../../Misc/Styles';
import styled from '@emotion/styled';

interface RegisterViewProps {
    /** Function to handle changes of both user inputs in the view */
    onChange: (e: React.SyntheticEvent) => void;
    /** Function to handle submitting the login */
    submit: (e: React.SyntheticEvent) => void;
}

const PaddedDiv = styled.div({
    paddingBottom: '10px'
});

const StyledControlledInput = styled(ControlledInput)`
    height: 45px;
`;

export const RegisterView: React.SFC<RegisterViewProps> = props => {
    return (
        <ContainerDiv>
            <InputCard>
                <form onSubmit={props.submit}>
                    <PaddedDiv>
                        <StyledControlledInput
                            onChange={props.onChange}
                            prefix={<Icon type="user" />}
                            placeholder="Enter an email address"
                            id="email"
                        />
                    </PaddedDiv>
                    <PaddedDiv>
                        <StyledControlledInput
                            onChange={props.onChange}
                            placeholder="Please enter a password"
                            type="password"
                            id="password"
                        />
                    </PaddedDiv>
                    <PaddedDiv>
                        <StyledControlledInput
                            onChange={props.onChange}
                            placeholder="Please reenter the password"
                            type="password"
                            id="repassword"
                        />
                    </PaddedDiv>
                    <Button
                        htmlType="submit"
                        type="primary"
                        onClick={props.submit}
                        style={{ margin: '5px' }}
                    >
                        Register
                    </Button>
                </form>
            </InputCard>
            <div style={{ margin: '5px' }}>
                Already have an account? Click <Link to="/login">here</Link> to
                login
            </div>
        </ContainerDiv>
    );
};
