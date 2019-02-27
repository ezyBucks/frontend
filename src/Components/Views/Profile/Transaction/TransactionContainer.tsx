import React from 'react';
import TransactionView from './TransactionView';
import { User } from '../../../../types/User';
import { wait } from '../../../Common/Mock';

/**
 * Interface to handle the two extra fields needed for an antd select component
 */
export interface UserSelect extends User {
    value: string; // The user id
    text: string; // The user name
}

interface TransactionContainerState {
    users: UserSelect[]; // Users fetched from the api query
    value: string; // The value passed into the select component
    fetching: boolean; // Whether data is currently being fetched from the api
}

/**
 * Class to contain the new transaction selector
 */
export class TransactionContainer extends React.Component<
    {},
    TransactionContainerState
> {
    constructor(props: {}) {
        super(props);

        this.state = { users: [], value: '', fetching: false };
    }

    /**
     * Fetch the users from the api based on a search string.
     * Currently returning dummy data with a delay to simulate
     * @param text The text query to send to the api
     * @returns Promise with the array of Users returned from the api
     */
    async getUsersFromAPI(text?: string): Promise<User[]> {
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

    /**
     * Convert the raw User objects into objects that can be used by the antd Select component
     * @param users User objects to process
     * @returns Array of formatted UserSelect objects
     */
    processUsers(users: User[]): UserSelect[] {
        return users.map(u => {
            return { ...u, value: `${u.id}`, text: u.username };
        });
    }

    /**
     * Get the users from the api, process them, then update the state
     * Only do so if a request isn't currently processing
     * @param text string to query the api with
     */
    getUsers = async (text?: string) => {
        if (!this.state.fetching) {
            this.setState({ fetching: true });
            const users = await this.getUsersFromAPI(text);
            const processedUsers = this.processUsers(users);
            this.setState({ users: processedUsers, fetching: false });
        }
    };

    /**
     * Handle when an item is selected in the child Select component
     * @param value the value that was selected (id)
     */
    handleChange = (value: string) => {
        this.setState({
            value,
            users: [],
            fetching: false
        });
    };

    render() {
        const { fetching, users } = this.state;
        return (
            <TransactionView
                handleChange={this.handleChange}
                fetchUsers={this.getUsers}
                fetching={fetching}
                users={users}
            />
        );
    }
}
