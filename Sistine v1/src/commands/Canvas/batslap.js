const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Slap another user as Batman.',
			usage: '[Slapped:username]'
		});
	}

	async run(msg, [slapped = msg.author]) {
		const image = await this.client.idioticApi.batSlap(msg.author.displayAvatarURL({ format: 'png', size: 128 }), slapped.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'batman-slap.png');
	}

};
