import * as React from 'react';
import * as Types from '../../../types/Types';
import {ProfileView} from "./ProfileView";
import {Skeleton} from "antd";

interface ProfileContainerProps {
    showFullName: boolean;
}

interface ProfileContainerState {
    user: Types.User | null;
}

export class ProfileContainer extends React.Component<ProfileContainerProps, ProfileContainerState> {

    constructor(props: ProfileContainerProps) {
        super(props);

        this.state = {
            user: null
        };
    }

    public componentDidMount() {
        this.setState({
            user: {
                id: 7,
                username: 'Robert Calvert',
                password: 'randombashdjwhakfgajsdghsd;lkfjghsdfg',
                email: 'rcalvert@live.com',
                verified: true
            }
        });
    }

    public render() {
        if (this.state.user === null) {
            return <Skeleton key={0}/>
        }

        return (
            <ProfileView user={this.state.user} />
        );
    }
}