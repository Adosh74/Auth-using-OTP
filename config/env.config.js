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
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    SECRET_TOKEN,
    PORT,
} = process.env;

module.exports = {
    node_env: NODE_ENV,
    port: PORT,
    db_port: DB_PORT,
    db_host: DB_HOST,
    db_dialect: DB_DIALECT,
    db_username: DB_USERNAME,
    db_password: DB_PASSWORD,
    db_database: DB_DATABASE,
    pepper: BCRYPT_PASSWORD,
    salt_rounds: parseInt(SALT_ROUNDS || '10', 10),
    jwt_secret: SECRET_TOKEN,
};
