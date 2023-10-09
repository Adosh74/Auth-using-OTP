const express = require('express');
const morgan = require('morgan');
const config = require('./config/env.config');

const app = express();

// middleware for logging requests (development only)
if (config.node_env === 'development') {
    app.use(morgan('dev'));
}

// parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
