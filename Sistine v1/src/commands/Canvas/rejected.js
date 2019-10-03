const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			aliases: ['reject'],
			description: 'Reject someone.',
			usage: '[User:username]'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.rejected(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.sendFile(image, 'rejected.png');
	}

};
