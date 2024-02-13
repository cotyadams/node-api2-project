// implement your server here
// require your posts router and connect it here
const express = require('express');

// import routes
const postRoutes = require('./posts/posts-router')

// define the server
const server = express();
const router = express.Router();

server.use(express.json())
// tells server to use postRoutes for specified routes
server.use('/api/posts', postRoutes);

module.exports = server
