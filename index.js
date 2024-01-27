const { token } = require('./config/config.json');
const client = require('./src/discord/client');

client.initializeClient(token);