const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Paint a happy little accident.',
			usage: '[User:username]'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.bobRoss(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.sendFile(image, 'bobRoss-painting.png');
	}

};
