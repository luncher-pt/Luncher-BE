require('dotenv').config();

//Express Server
const express = require('express');
const server = express();

//Middleware Import
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

//Routes Import
const routes = require('../Routes/api');

//Middleware Usage
server.use(
    express.json(),
    helmet(),
    cors(),
    
);

//Routes Usage
server.use('/', routes);

//Root Route
server.get('/', (req, res) => {
    res.status(200).json({ api: 'Server Running' });
});

module.exports = server;