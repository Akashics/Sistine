const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreBots: false,
			ignoreSelf: false,
			ignoreOthers: false,
			enabled: false
		});
	}

	async run(msg) {
		if (!this.client.ready) return;
		this.client.configs.update('messages', this.client.configs.messages + 1, msg.guild);
	}

};
