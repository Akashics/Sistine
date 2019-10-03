const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

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
		const image = await this.client.idioticAPI.pls(user.username);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
