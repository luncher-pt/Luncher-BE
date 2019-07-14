const router = require('express').Router();

const register = require('./registerRoute')

const userRoutes = require('./userRoutes');
const schoolRoutes = require('./schoolsRoutes');

router.use('/register', register)

router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);

module.exports = router;