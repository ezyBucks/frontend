import * as React from 'react';
import { ContainerDiv } from '../../../Common/Styles';
import AutoComplete, { DataSourceItemType } from 'antd/lib/auto-complete';
import { Select, Spin } from 'antd';
import { User } from '../../../../types/User';
import { UserSelect } from './TransactionContainer';

/**
 * Props needed for the Select component
 */
interface TransactionViewProps {
    fetching: boolean;
    fetchUsers: (text?: string) => Promise<void>;
    handleChange: (value: string) => void;
    users: UserSelect[];
}

const TransactionView: React.SFC<TransactionViewProps> = props => {
    return (
        <ContainerDiv
            style={{
                marginTop: '30px'
            }}
        >
            <div style={{width: '400px', paddingBottom:'25px'}}>
                <h3>Transfer</h3>
                <Select
                    notFoundContent={props.fetching && <Spin size={'small'} />}
                    placeholder={'Select users to transfer'}
                    mode={'multiple'}
                    style={{ width: '70%' }}
                    onSearch={props.fetchUsers}
                    onChange={props.handleChange}
                    filterOption={false}
                >
                    {props.users.map(u => (
                        <Select.Option key={u.value}>{u.text}</Select.Option>
                    ))}
                </Select>
            </div>
            <div>
                <h3>Amount of ezybucks to send</h3>
            </div>
        </ContainerDiv>
    );
};

export default TransactionView;
