const router = require('express').Router();

const userRoutes = require('./userRoutes');
const schoolRoutes = require('./schoolsRoutes');

router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);

module.exports = router;