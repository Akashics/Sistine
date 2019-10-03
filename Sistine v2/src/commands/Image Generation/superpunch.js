const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Punch someone as Superman.',
			usage: '[Punched:username]'
		});
	}

	async run(msg, [punched = msg.author]) {
		const image = await this.client.idioticAPI.superPunch(msg.author.displayAvatarURL({ format: 'png', size: 128 }), punched.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
