const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Spank someone as Superman.',
			usage: '[Spanked:username]'
		});
	}

	async run(msg, [spanked = msg.author]) {
		const image = await this.client.idioticAPI.superSpank(msg.author.displayAvatarURL({ format: 'png', size: 128 }), spanked.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
