const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			guarded: true,
			description: (msg) => msg.language.get('COMMAND_HELP_DESCRIPTION')
		});
	}

	async run(msg) {
		const embed = new MessageEmbed()
			.setColor('PURPLE')
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setFooter(`Total of ${this.client.commands.size} commands | Check our support guild for secrets.`)
			.addField('All My Commands', 'My commands are listed on my website here: https://sistine.ml/')
			.addField('Upvote Sistine', 'Upvoting gives you access to more commands monthly!\nhttps://discordbots.org/bot/429775457861500939/vote')
			.addField('🏰 My Discord Guild 🏰', 'https://discord.gg/jgPNHWy');
		return msg.send('', { embed });
	}

};
