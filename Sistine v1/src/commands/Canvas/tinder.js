const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'tinderMatch',
			usage: '<Match:username> [User:username]',
			usageDelim: ' '
		});
	}

	async run(msg, [match, user = msg.author]) {
		const image = await this.client.idioticApi.tinderMatch(match.displayAvatarURL({ format: 'png', size: 256 }), user.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'tinder.png');
	}

};
