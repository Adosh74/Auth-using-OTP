import app from './app.js';
import { DbConnection } from './config/database.config.js';

const port = process.env.PORT || 3001;

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
