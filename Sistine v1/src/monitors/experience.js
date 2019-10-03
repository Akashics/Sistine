const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false
		});
	}

	async run(msg) {
		// If the message was not sent in a TextChannel, ignore it.
		if (!msg.guild) return;

		// Update the user's configuration entry by adding 1 to it.
		await msg.author.configs.update('experience', msg.author.configs.experience + 1);
	}

	async init() {
		if (!this.client.gateways.users.schema.has('experience')) {
			this.client.gateways.users.schema.add('experience', {
				type: 'integer',
				default: 0,
				configurable: false
			});
		}
		if (!this.client.gateways.users.schema.has('level')) {
			this.client.gateways.users.schema.add('level', {
				type: 'integer',
				default: 0,
				configurable: false
			});
		}
	}

};
