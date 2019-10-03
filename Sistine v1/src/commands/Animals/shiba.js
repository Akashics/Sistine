const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: msg => msg.language.get('COMMAND_SHIBA_DESCRIPTION'),
			extendedHelp: msg => msg.language.get('COMMAND_SHIBA_EXTENDED')
		});
	}

	async run(msg) {
		const { body } = await this.fetchURL('http://shibe.online/api/shibes')
			.catch(error => {
				this.client.console.wtf(error);
				throw msg.send('oh no i couldnt find a shiba. what has this world come to?!?!');
			});
		return msg.channel.sendFile(body[0]);
	}

};
