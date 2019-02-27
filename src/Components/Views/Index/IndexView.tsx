import * as React from 'react';
import { LeftHalf, RightHalf, ContainerDiv } from '../../Common/Styles';
import { ProfileContainer } from '../Profile/ProfileContainer';
import { TransactionContainer } from '../Profile/Transaction/TransactionContainer';

/**
 * Class to display the main landing page when not logged in.
 */
export const IndexView: React.SFC = () => {
    return (
        <div>
            <LeftHalf>
                <ProfileContainer showEmail={true} />
            </LeftHalf>
            <RightHalf>
                <TransactionContainer />
            </RightHalf>
        </div>
    );
};
