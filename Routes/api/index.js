const router = require('express').Router();

const register = require('./registerRoute')
const login = require('./loginRoute')

const userRoutes = require('./userRoutes');
const schoolRoutes = require('./schoolsRoutes');

router.use('/register', register)
router.use('/login', login)

router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);

module.exports = router;