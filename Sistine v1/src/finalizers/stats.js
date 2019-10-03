const { Finalizer } = require('klasa');

module.exports = class CMDStats extends Finalizer {

	constructor(...args) {
		super(...args, {
			name: 'stats',
			enabled: true
		});
	}
	/* eslint-disable consistent-return */
	async run(msg) {
		if (!this.client.ready) return;
		if (!this.client.executedCommands.get(msg.command.name)) {
			return this.client.executedCommands.set(msg.command.name, 1);
		}
		const prev = this.client.executedCommands.get(msg.command.name);
		this.client.executedCommands.set(msg.command.name, prev + 1);
		return this.client.configs.update('executions', this.client.configs.executions + 1, msg.guild);
	}

};
