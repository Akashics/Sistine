const { Extendable } = require('klasa');
const { Message } = require('discord.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [Message] });
	}

	async awaitReply(question, time = 60000, embed) {
		await (embed ? this.send(question, { embed }) : this.send(question));
		return this.channel.awaitMessages(msg => msg.author.id === this.author.id, { max: 1, time, errors: ['time'] })
			.then(msgs => msgs.first().content);
	}

};
