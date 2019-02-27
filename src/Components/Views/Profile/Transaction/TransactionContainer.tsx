import React from 'react';
import TransactionView from './TransactionView';
import { User } from '../../../../types/User';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface UserSelect extends User {
    value: string; // This will be the user id
    text: string; // This will be the user name
}

interface TransactionContainerState {
    users: UserSelect[];
}

export class TransactionContainer extends React.Component<
    {},
    TransactionContainerState
> {
    constructor(props: {}) {
        super(props);

        this.state = { users: [] };
    }

    componentDidMount() {
        this.getUsers().then(users => {
            this.setState({ users });
        });
    }

    async getUsersFromAPI(): Promise<User[]> {
        await wait(1500);
        return [
            {
                id: 1,
                username: 'justin',
                email: 'justin.hallier@ezyvet.com',
                password: 'this shouldnt be a property lol',
                verified: true
            },
            {
                id: 2,
                username: 'robert',
                email: 'robert.calvert@ezyvet.com',
                password: 'this shouldnt be a property lol',
                verified: true
            }
        ];
    }

    processUsers(users: User[]): UserSelect[] {
        return users.map(u => {
            return { ...u, value: `${u.id}`, text: u.username };
        });
    }

    async getUsers() {
        const users = await this.getUsersFromAPI();
        return this.processUsers(users);
    }

    render() {
        return this.state.users ? (
            <TransactionView dataSource={this.state.users} />
        ) : null;
    }
}
