const { PORT } = process.env;

const express = require('express');
const http = require('http')

const app = express();

const { startBot } = require('./bot')
const { cronRoutine } = require('./cron')

const server = http.createServer(app)

const port = PORT || '8080';

const router = express.Router();

router.get('/',(req, res) => {
    return res.status(200).json({ message: 'Avoid idling' })
});

server.listen(port, () => {
    startBot()
    cronRoutine()
    console.log(`BOT running on port ${port}.`);
});

module.exports = { server };
