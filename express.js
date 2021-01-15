const { PORT, NODE_ENV } = process.env;

const express = require('express');
const http = require('http')

if (!NODE_ENV || NODE_ENV === 'development') {
    require('dotenv').config();
}

const app = express();

const { startBot } = require('./bot')
const { cronRoutine } = require('./cron')
const routes = require('./routes')

app.use(routes)

const port = PORT || '8080';

const server = http.createServer(app)

server.listen(port, () => {
    startBot()
    cronRoutine()
    console.log(`BOT running on port ${port}.`);
});

module.exports = { server };
