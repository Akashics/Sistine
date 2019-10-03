const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class FacepalmCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 35,
			aliases: ['facep'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Some people might really get you the point to Facepalm, this does exactly that..',
			extendedHelp: 'You know when people are just really annoying or stupid? Just use this command to facepalm super hard.'
		});
	}

	async run(msg) {
		const image = await this.client.idioticAPI.facepalm(msg.author.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}


};
