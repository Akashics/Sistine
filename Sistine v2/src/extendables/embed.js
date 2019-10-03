const { Extendable, Command } = require('klasa');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, {
			appliesTo: [Command],
			klasa: true
		});
	}

	embed() {
		return new MessageEmbed()
			.setColor('PINK')
			.setFooter(this.client.user.tag, this.client.user.displayAvatarURL());
	}

	embedAttachment(image) {
		return new MessageEmbed()
			.setColor(3553598)
			.attachFiles([new MessageAttachment(image, 'EmbedAttachment.png')])
			.setImage('attachment://EmbedAttachment.png');
	}

};
