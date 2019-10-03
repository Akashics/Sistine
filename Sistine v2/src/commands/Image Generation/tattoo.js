const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: "Adds a tattoo to a mentioned user's arm",
			usage: '[User:username]',
			extendedHelp: 'Mention another user to get them tattooed on your arm.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticAPI.tattoo(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
