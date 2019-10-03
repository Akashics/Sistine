const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Show off your rainbow.',
			usage: '[User:username]'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.rainbow(user.displayAvatarURL({ format: 'png', size: 2048 }));
		return msg.channel.sendFile(image, 'rainbow.png');
	}

};
