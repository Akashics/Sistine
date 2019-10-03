const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Show someone how confused you are.',
			usage: '<User:username>'
		});
	}

	async run(msg, [user]) {
		const image = await this.client.idioticAPI.confused(msg.author.displayAvatarURL({ format: 'png', size: 128 }), user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
