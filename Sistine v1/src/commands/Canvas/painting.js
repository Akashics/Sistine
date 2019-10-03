const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Display a valuable, but deadly painting.',
			usage: '[User:username]',
			extendedHelp: 'Mention another user to post a deadly painting of them.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.painting(user.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'painting.png');
	}

};
