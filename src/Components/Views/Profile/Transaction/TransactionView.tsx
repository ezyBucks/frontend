import * as React from 'react';
import { ContainerDiv } from '../../../Common/Styles';
import AutoComplete, { DataSourceItemType } from 'antd/lib/auto-complete';

interface TransactionViewProps {
    dataSource: DataSourceItemType[];
}

const TransactionView: React.SFC<TransactionViewProps> = props => {
    return (
        <ContainerDiv
            style={{
                marginTop: '30px'
            }}
        >
            <AutoComplete dataSource={props.dataSource} filterOption={true} />
        </ContainerDiv>
    );
};

export default TransactionView;
