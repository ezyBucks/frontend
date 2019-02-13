import * as React from 'react';
import {ContainerDiv} from "../../Common/Styles";

interface BalanceViewProps {
    balance: number;
}

export const BalanceView: React.SFC<BalanceViewProps> = props => {
    return (
        <ContainerDiv>
            Account Balance
            <br/>
            {props.balance} ezy bucks
        </ContainerDiv>
    );
};