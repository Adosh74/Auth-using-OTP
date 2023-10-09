import { Sequelize } from 'sequelize';
import config from './env.config.js';

const sequelize = new Sequelize(
    config.db_database,
    config.db_username,
    config.db_password,
    {
        host: config.db_host,
        port: config.db_port,
        dialect: config.db_dialect,
    },
);

export const DbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
