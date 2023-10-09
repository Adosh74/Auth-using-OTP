const config = require('../config/env.config');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.success = err.success || false;

    // if  development environment
    if (config.node_env === 'development') {
        res.status(err.statusCode).json({
            success: err.success,
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    } else {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                success: err.success,
                status: err.status,
                message: err.message,
            });
        }
        return res.status(500).json({
            success: false,
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};
