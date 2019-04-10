import * as React from 'react';
import { ContainerDiv } from '../../Common/Styles';

interface BalanceViewProps {
    balance: number;
}

export const BalanceView: React.SFC<BalanceViewProps> = props => {
    return (
        <ContainerDiv style={{ fontSize: '20px' }}>
            <b>Account Balance</b>
            <br />
            {props.balance} ezy bucks
        </ContainerDiv>
    );
};
