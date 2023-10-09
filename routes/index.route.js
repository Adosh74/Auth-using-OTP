const { Router } = require('express');
const authRoutes = require('./APIs/auth.route');

const router = Router();

router.use('/', authRoutes);

module.exports = router;
