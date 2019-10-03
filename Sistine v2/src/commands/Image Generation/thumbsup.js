const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			aliases: ['vault', 'vaultboy'],
			description: 'Give a thumbs up as another user.',
			usage: '[User:username]',
			extendedHelp: 'Mention another user to thumbs up of them.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticAPI.vaultBoy(user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
