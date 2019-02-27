import * as React from 'react';
import * as Types from '../../../types/Types';
import {ProfileView} from "./ProfileView";
import {Skeleton} from "antd";

interface ProfileContainerProps {
    showEmail: boolean;
}

interface ProfileContainerState {
    user: Types.User | undefined;
}

export class ProfileContainer extends React.Component<ProfileContainerProps, ProfileContainerState> {

    constructor(props: ProfileContainerProps) {
        super(props);

        this.state = {
            user: undefined
        };
    }

    public componentDidMount() {
        this.setState({
            user: {
                id: 7,
                username: 'Robert Calvert',
                password: '$2a$10$kSidjm0VrxW/bNFShtTxGulpIHyXvHEbbXWVQNRAeV0aFohKzFhUG',
                email: 'rcalvert@live.com',
                verified: true
            }
        });
    }

    public render() {
        if (this.state.user === undefined) {
            return <Skeleton active={true} key={0}/>
        }

        return (
            <ProfileView user={this.state.user} />
        );
    }
}