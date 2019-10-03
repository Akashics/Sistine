const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

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
		const image = await this.client.idioticAPI.painting(user.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
