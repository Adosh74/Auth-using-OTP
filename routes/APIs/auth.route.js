const { Router } = require('express');
const {
    registration,
    login,
    verify,
} = require('../../controllers/auth.controller');

const router = Router();

router.post('/register', registration);
router.post('/login', login);
router.post('/verify', verify);

module.exports = router;
