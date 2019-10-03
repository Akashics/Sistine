const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Slap another user as Batman.',
			usage: '[Slapped:username]'
		});
	}

	async run(msg, [slapped = msg.author]) {
		const image = await this.client.idioticAPI.batSlap(msg.author.displayAvatarURL({ format: 'png', size: 128 }), slapped.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
