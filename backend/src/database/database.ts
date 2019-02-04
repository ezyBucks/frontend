import { createConnection, ConnectionOptions } from 'typeorm';
import { isDev } from '../helper';

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: isDev ? 'localhost' : 'production goes here',
    port: 5432,
    username: 'postgres',
    password: 'rootpassword',
    database: 'ezybucks'
};

const connect = async () => {
    await createConnection(connectionOptions).catch(err => {
        console.log(err);
        throw new Error('Failed to make connection to database');
    });
};

export default connect;
