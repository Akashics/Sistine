const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Post a stepped picture of a user.',
			usage: '<User:username>',
			extendedHelp: 'Mention another user to step on them.'
		});
	}

	async run(msg, [user]) {
		const image = await this.client.idioticApi.stepped(user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.sendFile(image, 'stepped.png');
	}

};
