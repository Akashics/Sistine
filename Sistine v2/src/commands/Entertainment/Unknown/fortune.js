const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class Fortune extends Command {

	constructor(...args) {
		super(...args, { description: 'Gets your fortune cookie.' });
	}

	async run(msg) {
		const req = await fetch('http://www.yerkee.com/api/fortune', this.client.config.fetchHeaders)
			.then((res) => res.json());
		const embed = new MessageEmbed()
			.setTitle('Random Fortune')
			.setColor('PURPLE')
			.setTimestamp()
			.setThumbnail('https://vignette4.wikia.nocookie.net/clubpenguin/images/b/bc/Emoticons_Fortune_Cookie_Card_Jitsu_Party_2013.png/revision/latest?cb=20130524131112')
			.addField('\u200b', req.fortune);
		return msg.send({ embed });
	}

};
