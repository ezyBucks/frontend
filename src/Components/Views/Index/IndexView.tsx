import * as React from 'react';
import {LeftHalf} from '../../Common/Styles';
import {ProfileContainer} from "../Profile/ProfileContainer";

/**
 * Class to display the main landing page when not logged in.
 */
export const IndexView: React.SFC = () => {
    return (
        <div>
            <LeftHalf>
                <ProfileContainer showFullName={true}/>
            </LeftHalf>
        </div>
    );
};
