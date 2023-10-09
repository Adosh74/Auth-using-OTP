import express from 'express';
import morgan from 'morgan';
import config from './config/env.config.js';

const app = express();

// middleware for logging requests (development only)
if (config.node_env === 'development') {
    app.use(morgan('dev'));
}

// parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
