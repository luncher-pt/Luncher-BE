require('dotenv').config();

//Express Server
const express = require('express');
const server = express();

//Middleware
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

server.use(
    express.json(),
    helmet(),
    cors(),
    logger('dev')
);

//Root Route
server.get('/', (req, res) => {
    res.status(200).json({ api: 'Server Running' });
});

module.exports = server;