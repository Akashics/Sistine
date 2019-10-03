const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: msg => msg.language.get('COMMAND_DUCK_DESCRIPTION'),
			extendedHelp: msg => msg.language.get('COMMAND_DUCK_EXTENDED')
		});
	}

	async run(msg) {
		const { body } = await this.fetchURL('https://random-d.uk/api/v1/random?type=gif').catch(error => {
			this.client.console.wtf(error);
			throw msg.language.get('COMMAND_DUCK_ERROR');
		});
		return msg.channel.sendFile(body.url);
	}

};
