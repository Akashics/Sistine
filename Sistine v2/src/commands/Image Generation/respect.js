const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Pay respects to someone.',
			usage: '[User:username]',
			extendedHelp: 'You can pay respects to any user on Discord.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticAPI.respect(user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
