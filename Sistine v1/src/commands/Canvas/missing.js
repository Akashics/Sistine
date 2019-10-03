const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Post a missing persons poster of a user.',
			usage: '[User:username]',
			extendedHelp: 'Mention another user to post a missing persons poster of them.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.missing(user.displayAvatarURL({ format: 'png', size: 512 }), user.username);
		return msg.channel.sendFile(image, 'missing.png');
	}

};
