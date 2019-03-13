import React, { SyntheticEvent } from 'react';
import TransactionView from './TransactionView';
import { User } from '../../../../types/User';
import { wait } from '../../../Common/Mock';
import { notification } from 'antd';
import { makeRequest } from '../../../../lib/fetch';
import { HOST } from '../../../../lib/constants';

/**
 * Interface to handle the two extra fields needed for an antd select component
 */
export interface UserSelect extends User {
    value: string; // The user id
    text: string; // The user name
}

interface TransactionContainerState {
    users: UserSelect[]; // Users fetched from the api query
    value: string[] | string; // The value passed into the select component
    fetchingUsers: boolean; // Whether data is currently being fetched from the api
    sending: boolean; // If the transaction is being processed on the backend
    amount: number; // The amount of ezybucks to send
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

        this.state = {
            users: [],
            value: '',
            fetchingUsers: false,
            sending: false,
            amount: 1
        };
    }

    /**
     * Fetch the users from the api based on a search string.
     * Currently returning dummy data with a delay to simulate
     * @param text The text query to send to the api
     * @returns Promise with the array of Users returned from the api
     */
    async getUsersFromAPI(text?: string): Promise<User[]> {
        let result = await makeRequest(`${HOST}/user`);
        if (result.status != 200) {
            throw new Error('' + result.status);
        }
        let content = await result.json();
        return [
            {
                id: 1,
                username: 'robert',
                email: 'robert.calvert@ezyvet.com',
                password: 'this shouldnt be a property lol',
                verified: true
            },
            ...content.items
        ];
    }

    /**
     * Convert the raw User objects into objects that can be used by the antd Select component
     * @param users User objects to process
     * @returns Array of formatted UserSelect objects
     */
    processUsers(users: User[]): UserSelect[] {
        return users.map(u => {
            return {
                ...u,
                value: `${u.id}`,
                text: `${u.username} - <${u.email}>`
            };
        });
    }

    /**
     * Get the users from the api, process them, then update the state
     * Only do so if a request isn't currently processing
     * @param text string to query the api with
     */
    getUsers = async (text?: string) => {
        if (!this.state.fetchingUsers) {
            this.setState({ fetchingUsers: true });
            try {
                //TODO: Add a timeout check so we dont' spam when a user is typing
                const users = await this.getUsersFromAPI(text);
                const processedUsers = this.processUsers(users);
                this.setState({ users: processedUsers, fetchingUsers: false });
            } catch (e) {
                console.log('Error fetching users from the API', e);
                notification.open({
                    message: 'Error fetching users!',
                    description:
                        'Something has gone wrong when fetching users; Please try again',
                    type: 'error'
                });
                this.setState({ fetchingUsers: false });
            }
        }
    };

    /**
     * Handle when an item is selected in the child Select component
     * @param value the value that was selected (id)
     */
    handleUserChange = (value: string) => {
        this.setState({
            value,
            users: [],
            fetchingUsers: false
        });
    };

    handleAmountChange = (value: number | undefined) => {
        value && this.setState({ amount: value });
    };

    /**
     * Handle sending ezybucks to another user
     */
    handleSend = async () => {
        const { amount, value } = this.state;
        console.log('clicked send!');
        this.setState({ sending: true });

        // debugger;
        // First, validate
        let description = '';
        let error = false;
        if (!value) {
            description =
                'No user selected; Please select a user and try again';
            error = true;
        }
        if (!amount) {
            description = 'No amount selected; Please select a valid amount';
            error = true;
        }
        if (error) {
            notification.open({
                message: 'Error!',
                description,
                type: 'error'
            });
            this.setState({ sending: false });
            return;
        }

        // Make the post to the transaction endpoint here
        await wait(2000);

        // Call this on successful post
        this.setState({ sending: false, value: '', amount: 1 });
        notification.open({
            message: `${amount} ezyBucks sent!`
        });
    };

    /**
     * Handle when the popconfirm is clicked
     */
    handlePopconfirmClick = () => {
        if (this.state.value.length === 0) {
            return 'Please select a user to send some bucks to before sending';
        }
        return 'Are you sure you want to send?';
    };

    render() {
        const { fetchingUsers, users, sending } = this.state;
        return (
            <TransactionView
                handleUserChange={this.handleUserChange}
                handleAmountChange={this.handleAmountChange}
                handleSend={this.handleSend}
                handleClick={this.handlePopconfirmClick}
                sending={sending}
                fetchUsers={this.getUsers}
                fetchingUsers={fetchingUsers}
                users={users}
            />
        );
    }
}
