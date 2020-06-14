import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export const createTypeORMConnection = async (): Promise<Connection> => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection(connectionOptions);
};

export default createTypeORMConnection;
