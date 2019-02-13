import * as React from 'react';
import * as Types from '../../../types/Types';
import { ContainerDiv } from '../../Common/Styles';

interface ProfileViewProps {
    user: Types.User;
}

export const ProfileView: React.SFC<ProfileViewProps> = props => {
    return (
        <ContainerDiv>
            {props.user.username}
            <br/>
            {props.user.email}
        </ContainerDiv>
    );
};