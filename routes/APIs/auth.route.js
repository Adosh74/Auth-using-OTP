const { Router } = require('express');
const { registration, login } = require('../../controllers/auth.controller');

const router = Router();

router.post('/register', registration);
router.post('/login', login);

module.exports = router;
