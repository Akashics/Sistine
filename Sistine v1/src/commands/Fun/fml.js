const { Command } = require('klasa');
const snekfetch = require('snekfetch');
const HTMLParser = require('fast-html-parser');
const { MessageEmbed } = require('discord.js');

module.exports = class FML extends Command {

	constructor(...args) {
		super(...args, { description: 'Gets a random FML story.' });
	}

	async run(msg) {
		const { text: html } = await snekfetch.get('http://www.fmylife.com/random');

		const root = HTMLParser.parse(html);
		const article = root.querySelector('.block a');
		const downdoot = root.querySelector('.vote-down');
		const updoot = root.querySelector('.vote-up');
		const embed = new MessageEmbed()
			.setAuthor('FML Stories')
			.setColor('PURPLE')
			.setTimestamp()
			.setDescription(`_${article.childNodes[0].text}\n\n_`)
			.addField('I agree, your life sucks', updoot.childNodes[0].text, true)
			.addField('You deserved it:', downdoot.childNodes[0].text, true);
		if (article.childNodes[0].text.length < 3) {
			return msg.send('Today, something went wrong, so you will have to try again in a few moments. FML again.');
		}
		return msg.send({ embed });
	}

};
