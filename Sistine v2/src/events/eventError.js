const { Event } = require('klasa');
const Sentry = require('@sentry/node');

module.exports = class extends Event {

	run(event, args, error) {
		this.client.stats.increment('event.error');
		this.client.emit('wtf', `[EVENT] ${event.path}\n${error ? error.stack ? error.stack : error : 'Unknown error'}`);
		Sentry.captureMessage(`eventError: ${event.name}\n${error ? error.stack ? error.stack : error : 'Unknown error'}`);
	}

};
