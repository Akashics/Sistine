const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

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
		const image = await this.client.idioticAPI.missing(user.displayAvatarURL({ format: 'png', size: 512 }), user.username);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
