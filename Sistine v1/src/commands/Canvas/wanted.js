const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Post a wanted picture of a user.',
			usage: '[User:username]',
			extendedHelp: 'Mention another user to post a wanted poster of them.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.wanted(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.sendFile(image, 'wanted.png');
	}

};
