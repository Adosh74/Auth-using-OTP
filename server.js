const app = require('./app');
const { DbConnection } = require('./config/database.config');
const config = require('./config/env.config');

const port = config.port || 3001;

DbConnection();

const server = app.listen(port, () => {
    console.log(`App running on prot ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
