const { BaseCluster } = require('kurasuta');
const Sentry = require('@sentry/node');
const settings = require('../config');

Sentry.init({ dsn: settings.dsn });

module.exports = class extends BaseCluster {

	launch() {
		Sentry.configureScope(() => this.client.login(this.manager.token));
	}

};

process.on('uncaughtException', err => {
	console.error(`[BaseCluster] Uncaught Exception:\n${err.stack}`);
	Sentry.captureException(err);
});
