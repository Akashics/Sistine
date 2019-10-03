const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class QuoteCommand extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			cooldown: 12,
			description: 'Quotes a users message from said message channel or mentioned channel.',
			usage: '[Channel:channelname] <Message:string{17,31}>',
			usageDelim: ' '
		});
	}

	async run(msg, [channel = msg.channel, id]) {
		const message = channel.messages.get(id) || await channel.messages.fetch(id).catch(() => null);
		if (!message) throw `That message does not exist.`;

		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
			.setDescription(message.content)
			.setFooter(`${msg.author.tag} in #${message.channel.name}`)
			.setColor('PURPLE')
			.setTimestamp(message.createdAt);
		if (message.attachments && message.attachments.size > 0) embed.setImage(message.attachments.first().url);
		return msg.sendEmbed(embed);
	}

};
