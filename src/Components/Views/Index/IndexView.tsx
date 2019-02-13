import * as React from 'react';
import {LeftHalf, RightHalf} from '../../Common/Styles';
import {ProfileContainer} from "../Profile/ProfileContainer";
import {BalanceContainer} from "../Balance/BalanceContainer";

/**
 * Class to display the main landing page when not logged in.
 */
export const IndexView: React.SFC = () => {
    return (
        <div>
            <LeftHalf>
                <ProfileContainer showEmail={true} />
            </LeftHalf>
        </div>
    );
};
