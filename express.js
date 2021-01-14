const { PORT } = process.env;

const express = require('express');
const http = require('http')

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
