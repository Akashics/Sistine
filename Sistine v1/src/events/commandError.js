const { Event, util: { codeBlock } } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class commandErrorEvent extends Event {

	/* eslint-disable max-len */
	async run(msg, command, params, error) {
		if (typeof error === 'string') return msg.send(error);
		const embed = new MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setColor('RED')
			.setTimestamp()
			.setTitle(`**Command Error**: ${command.category}:${command.name}`)
			.setDescription(`\`\`\`\n${error.stack || error.message || error}\`\`\``)
			.setFooter(msg.guild ? msg.guild.name : 'Sistine');
		if (typeof error !== 'string') this.client.console.wtf(`[COMMAND] ${command.category}:${command.name}\n${error.stack || error.message || error}`);
		this.client.botlog.send('', { embed });
		if (error.message) {
			return msg.sendMessage(`There has been an error while running the command, Try again and if the problem incurs again contact ${this.client.owner.tag}\n${codeBlock('json', error.message)}`)
				.catch(err => this.client.emit('wtf', err));
		}
		return msg.sendMessage(`There has been an error while running the command, Try again and if the problem incurs again contact ${this.client.owner.tag}`).catch(err => this.client.emit('wtf', err));
	}

};
