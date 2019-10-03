const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: msg => msg.language.get('COMMAND_FOX_DESCRIPTION'),
			extendedHelp: msg => msg.language.get('COMMAND_FOX_EXTENDED')
		});
	}

	async run(msg) {
		const { body } = await this.fetchURL('https://randomfox.ca/floof/').catch(error => {
			this.client.console.wtf(error);
			throw msg.language.get('COMMAND_FOX_ERROR');
		});
		return msg.channel.sendFile(body.image);
	}

};
