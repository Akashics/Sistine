const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Spank someone as Superman.',
			usage: '[Spanked:username]'
		});
	}

	async run(msg, [spanked = msg.author]) {
		const image = await this.client.idioticApi.superSpank(msg.author.displayAvatarURL({ format: 'png', size: 128 }), spanked.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.sendFile(image, 'superman-super-spank.png');
	}

};
