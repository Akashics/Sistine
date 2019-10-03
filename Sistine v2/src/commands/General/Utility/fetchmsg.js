const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 12,
			aliases: ['content'],
			description: 'Get the message content of a message with markdown',
			usage: '[Channel:channelname] <Message:string{17,31}>',
			usageDelim: ' '
		});
	}

	async run(msg, [channel = msg.channel, id]) {
		const message = channel.messages.get(id) || await channel.messages.fetch(id).catch(() => null);
		if (!message) throw `That message id couldnt be found`;

		return msg.send(message.content, { code: 'md' });
	}

};
