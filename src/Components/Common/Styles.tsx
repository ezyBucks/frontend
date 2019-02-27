import styled from '@emotion/styled';
import { Card } from 'antd';

export const ContainerDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

export const LeftHalf = styled.div({
    display: 'block',
    width: '50%',
    float: 'left',
});

export const RightHalf = styled.div({
    display: 'block',
    width: '50%',
    float: 'right',
});

export const InputCard = styled(Card)`
    width: 600px;
    margin: 50px;
`;
