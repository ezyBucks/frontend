import { Connection, createConnection } from 'typeorm';

const connect = async () => {
    await createConnection().catch(err => {
        console.log(err);
        throw new Error('Failed to make connection to database');
    });
};

export default connect;
