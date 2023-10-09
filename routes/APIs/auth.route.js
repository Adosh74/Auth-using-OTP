const { Router } = require('express');
const { registration } = require('../../controllers/auth.controller');

const router = Router();

router.post('/registration', registration);

module.exports = router;
