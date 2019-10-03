const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');


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
		const image = await this.client.idioticAPI.wanted(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
