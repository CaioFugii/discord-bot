const { PORT } = process.env;

const express = require('express');
const http = require('http')

const app = express();

const { startBot } = require('./bot')

const server = http.createServer(app)

const port = PORT || '8080';


server.listen(port, () => {
    startBot()
    console.log(`BOT running on port ${port}.`);
});

module.exports = { server };
