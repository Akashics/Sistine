const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Creates an image based achievement',
			usage: '[User:username] <Text:string{1,22}>',
			extendedHelp: 'Either mention a user with text to give the achievement their user avatar, or just supply text for your own achievement.'
		});

		this.customizeResponse('Text', '`❌` You must provide a string of text no longer than 22 characters to be used as your achievement name.');
	}

	async run(msg, [user = msg.author, text]) {
		const image = await this.client.idioticAPI.achievement(user.displayAvatarURL({ format: 'png', size: 32 }), text);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
