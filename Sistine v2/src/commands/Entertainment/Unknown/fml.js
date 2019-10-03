const { Command } = require('klasa');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');
const { MessageEmbed } = require('discord.js');

module.exports = class FML extends Command {

	constructor(...args) {
		super(...args, { enabled: false, description: 'Gets a random FML story.' });
	}

	async run(msg) {
		const { body } = await fetch('http://www.fmylife.com/random', this.client.config.fetchHeaders);
		const root = HTMLParser.parse(body.toString('utf8'));
		const article = root.querySelector('.block a');
		const downdoot = root.querySelector('.vote-down');
		const updoot = root.querySelector('.vote-up');
		const href = root.querySelector('.panel-content p.block a');
		const card = root.querySelector('.panel-content div.votes span.vote div');
		const signature = root.querySelector('.panel div.text-center');
		const link = `http://www.fmylife.com${href.rawAttrs.replace(/^href=|"/g, '')}`;
		const cardId = card.rawAttrs.replace(/\D/g, '');
		let signatureDisplay = 'Author and date of this fml unkown';
		if (signature.childNodes.length === 1) {
			signatureDisplay = signature.childNodes[0].text;
		} else if (signature.childNodes.length === 3) {
			signatureDisplay = signature.childNodes[0].text.replace('-', '/') + signature.childNodes[2].text.replace('/', '');
		}

		const embed = new MessageEmbed()
			.setTitle(`FML #${cardId}`)
			.setURL(link)
			.setColor(165868)
			.setThumbnail('http://i.imgur.com/5cMj0fw.png')
			.setDescription(`_${article.childNodes[0].text}\n\n_`)
			.setFooter(signatureDisplay)
			.addField('I agree, your life sucks', updoot.childNodes[0].text, true)
			.addField('You deserved it:', downdoot.childNodes[0].text, true);
		if (article.childNodes[0].text.length < 5) {
			return msg.channel.send('Today, something went wrong, so you\'ll have to try again in a few moments. FML');
		}
		return msg.sendEmbed(embed);
	}

};
