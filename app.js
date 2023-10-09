const express = require('express');
const morgan = require('morgan');
const config = require('./config/env.config');
const routes = require('./routes/index.route');
const AppError = require('./utils/appError');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// middleware for logging requests (development only)
if (config.node_env === 'development') {
    app.use(morgan('dev'));
}

// parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/xyz', (req, res) => {
    res.status(200).send('Server Working!');
});

app.use('/api', routes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorMiddleware);

module.exports = app;
