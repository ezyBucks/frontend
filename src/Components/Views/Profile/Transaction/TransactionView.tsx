import * as React from 'react';
import { ContainerDiv } from '../../../Common/Styles';
import AutoComplete, { DataSourceItemType } from 'antd/lib/auto-complete';
import { Select, Spin, InputNumber, Button } from 'antd';
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
            <div style={{ width: '400px', paddingBottom: '15px' }}>
                <h3>Transfer</h3>
                <Select
                    notFoundContent={props.fetching && <Spin size={'small'} />}
                    placeholder={'Select users to transfer to'}
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
            <div style={{paddingBottom: '15px'}}>
                <h3>Amount of ezyBucks to send</h3>
                <InputNumber
                    defaultValue={1}
                    formatter={value =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={value =>
                        parseInt(
                            value ? value.replace(/\$\s?|(,*)/g, '') : '',
                            10
                        )
                    }
                    min={1}
                />
            </div>
            <div>
                <Button>Send!</Button>
            </div>
        </ContainerDiv>
    );
};

export default TransactionView;
