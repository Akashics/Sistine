const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			botPerms: ['ATTACH_FILES'],
			description: 'Trigger someone...',
			usage: '[User:username]',
			extendedHelp: 'Ever get so pissed off you explode? You got triggered.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.triggered(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.sendFile(image, 'triggered.gif');
	}

};
