const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'A new challenger has appeared.',
			usage: '[User:username]'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticAPI.challenger(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` },
				footer: {
					text: `${this.client.user.username} - Requested by ${msg.author.tag}`,
					icon_url: this.client.user.displayAvatarURL() // eslint-disable-line
				}
			}
		});
	}

};
