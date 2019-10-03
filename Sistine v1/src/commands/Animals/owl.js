const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: msg => msg.language.get('COMMAND_OWL_DESCRIPTION'),
			extendedHelp: msg => msg.language.get('COMMAND_OWL_EXTENDED')
		});
	}

	async run(msg) {
		const { body } = await this.fetchURL('http://pics.floofybot.moe/owl')
			.catch(error => {
				this.client.console.wtf(error);
				throw msg.language.get('COMMAND_OWL_ERROR');
			});
		return msg.channel.sendFile(body.image);
	}

};
