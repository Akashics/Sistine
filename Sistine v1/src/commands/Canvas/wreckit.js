const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Based on the Wreck It Ralph 2 meme.',
			usage: '[User:username]'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.wreckIt(user.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'wreck.png');
	}

};
