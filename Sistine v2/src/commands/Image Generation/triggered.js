const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			botPerms: ['ATTACH_FILES'],
			description: 'Trigger someone...',
			usage: '[User:username]',
			extendedHelp: 'Ever get so pissed off you explode? You got triggered.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticAPI.triggered(user.displayAvatarURL({ format: 'png', size: 512 }));
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.gif`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.gif` }
			}
		});
	}

};
