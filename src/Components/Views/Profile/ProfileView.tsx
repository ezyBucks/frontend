import * as React from 'react';
import * as Types from '../../../types/Types';
import * as Constants from '../../../lib/constants';
import { Avatar } from 'antd';
import { ContainerDiv } from '../../Common/Styles';
import BalanceContainer from '../Balance/BalanceContainer';

interface ProfileViewProps {
    user: Types.User;
}

export const ProfileView: React.SFC<ProfileViewProps> = props => {
    return (
        <ContainerDiv style={{ marginTop: '30px' }}>
            <div style={{ float: 'left', width: '25%' }}>
                <UserAvatar initials={getInitials(props.user.username)} />

                <span>
                    <b style={{ fontSize: '20px' }}>{props.user.username}</b>
                    <br />
                    {props.user.email}
                </span>

                <div style={{ marginTop: '50px' }}>
                    <BalanceContainer />
                </div>
            </div>
        </ContainerDiv>
    );
};

/**
 * Represents a user's avatar.
 */
const UserAvatar: React.SFC<{ initials: string }> = props => {
    return (
        <Avatar
            shape={'square'}
            size={64}
            style={{
                float: 'left',
                fontSize: '25px',
                backgroundColor: Constants.ANTD_COLOUR
            }}
        >
            <b>{props.initials}</b>
        </Avatar>
    );
};

/**
 * Returns the initials of the given username.
 *
 * @param username - the username to derive initials from.
 *
 * @returns string
 */
function getInitials(username: string): string {
    return ['', ...username.split(' ')].reduce(
        (initials, word) => initials + word[0]
    );
}
