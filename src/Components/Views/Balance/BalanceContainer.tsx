import * as React from 'react';
import * as Types from '../../../types/Types';
import { Skeleton } from 'antd';
import { BalanceView } from './BalanceView';

interface BalanceContainerProps {
    userId: number;
}

interface BalanceContainerState {
    balance: Types.Balance | undefined;
}

export class BalanceContainer extends React.Component<
    BalanceContainerProps,
    BalanceContainerState
> {
    constructor(props: BalanceContainerProps) {
        super(props);

        this.state = {
            balance: undefined
        };
    }

    public componentDidMount() {
        this.setState({
            balance: {
                userId: this.props.userId,
                balance: 2786
            }
        });
    }

    public render() {
        if (this.state.balance === undefined) {
            return <Skeleton active={true} />;
        }

        return <BalanceView balance={this.state.balance.balance} />;
    }
}
