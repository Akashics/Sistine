const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const snek = require('snekfetch');

module.exports = class Trump extends Command {

	constructor(...args) {
		super(...args, { description: 'Fetch one of Trumps famous quotes!' });
	}

	async run(msg) {
		const req = await snek.get('https://api.whatdoestrumpthink.com/api/v1/quotes/random');
		const embed = new MessageEmbed()
			.setTitle('Random Trump Quote')
			.setColor('PURPLE')
			.setTimestamp()
			.setThumbnail('https://www.bloomberg.com/graphics/2017-comey-vs-trump/img/trump.png')
			.addField('\u200b', `${req.body.message}`);
		return msg.send({ embed });
	}

};
