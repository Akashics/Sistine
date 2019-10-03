require('./src/lib/extenders/SistineGuild');
const SistineClient = require('./src/Client.js');

new SistineClient().login(SistineClient.token);
