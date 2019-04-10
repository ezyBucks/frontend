import * as React from 'react';
import { Skeleton } from 'antd';
import { BalanceView } from './BalanceView';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setBalance } from '../../../store/user/actions';
import { makeRequest } from '../../../lib/fetch';
import { HOST } from '../../../lib/constants';
import { AppState } from '../../../store/rootReducer';
import { wait } from '../../Common/Mock';

interface BalanceContainerProps {
    balance?: number;
    setBalance: typeof setBalance;
}

export class BalanceContainer extends React.Component<
    BalanceContainerProps,
    {}
> {
    constructor(props: BalanceContainerProps) {
        super(props);
    }

    public async componentDidMount() {
        try {
            const response = await makeRequest(`${HOST}/balance`);
            const result = await response.json();
            this.props.setBalance(result.total);
        } catch (e) {
            console.error('Error fetching user balance', e);
        }
    }

    public render() {
        if (this.props.balance === undefined) {
            return <Skeleton active={true} />;
        }

        return <BalanceView balance={this.props.balance} />;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        balance: state.user.balance
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setBalance: (value: number) => dispatch(setBalance(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BalanceContainer);
