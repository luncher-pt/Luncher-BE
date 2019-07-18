const router = require('express').Router();

// IMPORT ROUTES
    const registerRoute = require('./registerRoute')
    const loginRoute = require('./loginRoute')
    const userRoutes = require('./userRoutes');
    const schoolRoutes = require('./schoolsRoutes');

// ATTACH ROUTES
    router.use('/register', registerRoute)
    router.use('/login', loginRoute)
    router.use('/users', userRoutes);
    router.use('/schools', schoolRoutes);

module.exports = router;