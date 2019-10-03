const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['steamcard', 'steamtradingcard'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Create a steam trading card.',
			usage: '[User:username]',
			extendedHelp: 'Uses the idiotic api to create a steam trading card.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticAPI.steam(user.displayAvatarURL({ format: 'png', size: 512 }), user.username);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
