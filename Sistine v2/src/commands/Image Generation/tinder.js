const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'tinderMatch',
			usage: '<Match:username> [User:username]',
			usageDelim: ' '
		});
	}

	async run(msg, [match, user = msg.author]) {
		const image = await this.client.idioticAPI.tinderMatch(match.displayAvatarURL({ format: 'png', size: 256 }), user.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
