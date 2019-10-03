const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class WYR extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['wy-rather', 'wyr'],
			description: (lang) => lang.get('COMMAND_WYR_DESCRIPTION')
		});
	}

	async run(msg) {
		try {
			const data = await fetch('http://www.rrrather.com/botapi')
				.then((res) => res.json());
			const embed = new MessageEmbed()
				.setTitle(`${data.title}...`)
				.setURL(data.link)
				.setColor('PURPLE')
				.setDescription(`A: ${data.choicea}\n\nOR\n\nB: ${data.choiceb}`);
			return msg.sendEmbed(embed);
		} catch (err) {
			return msg.send(msg.language.get('COMMAND_ERROR'));
		}
	}

};
