import * as React from 'react';
import * as Types from '../../../types/Types';
import { ProfileView } from './ProfileView';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { User } from '../../../types/Types';

interface ProfileContainerProps {
    showEmail: boolean;
    user?: User;
}

export class ProfileContainer extends React.Component<
    ProfileContainerProps,
    {}
> {
    constructor(props: ProfileContainerProps) {
        super(props);
    }

    public render() {
        if (this.props.user === undefined) {
            return <Skeleton active={true} key={0} />;
        }

        return <ProfileView user={this.props.user} />;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user.user
    };
};

export default connect(
    mapStateToProps,
    undefined
)(ProfileContainer);
