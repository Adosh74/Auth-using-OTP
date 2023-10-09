const dotenv = require('dotenv');

dotenv.config();

const {
    NODE_ENV,
    DB_PORT,
    DB_HOST,
    DB_DIALECT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
} = process.env;

module.exports = {
    node_env: NODE_ENV,
    db_port: DB_PORT,
    db_host: DB_HOST,
    db_dialect: DB_DIALECT,
    db_username: DB_USERNAME,
    db_password: DB_PASSWORD,
    db_database: DB_DATABASE,
};
