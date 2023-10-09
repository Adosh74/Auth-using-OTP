const express = require('express');
const morgan = require('morgan');
const config = require('./config/env.config');
const routes = require('./routes/index.route');
const AppError = require('./utils/appError');
const errorMiddleware = require('./middleware/error.middleware');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');

const app = express();

// middleware for logging requests (development only)
if (config.node_env === 'development') {
    app.use(morgan('dev'));
}

// middleware for limiting requests
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

// parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for preventing parameter pollution
app.use(hpp());

// middleware for preventing cross-site scripting attacks (XSS)
app.use(xss());

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
