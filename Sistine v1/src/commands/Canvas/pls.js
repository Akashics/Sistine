const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Ask nicely!',
			usage: '<User:username>',
			extendedHelp: "Didn't your mother always tell you to say please? Now you can with a bot!"
		});
	}

	async run(msg, [user]) {
		const image = await this.client.idioticApi.pls(user.username);
		return msg.channel.sendFile(image, 'pls.png');
	}

};
