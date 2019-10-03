const { Command } = require('klasa');
const snek = require('snekfetch');

/* eslint-disable max-len */

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 5,
			description: (msg) => msg.language.get('COMMAND_MEME_DESCRIPTION')
		});
	}

	async run(msg) {
		const { body } = await snek.get(`https://www.reddit.com/r/dankmemes/top.json?limit=100&t=day`);
		const imageMemes = [];
		for (let i = 0; i < body.data.children.length; i++) {
			if (body.data.children[i].data.url) imageMemes.push(body.data.children[i].data.url);
		}
		return msg.send('', { embed: { color: 0x36393E, author: { name: 'Meme', iconURL: msg.author.displayAvatarURL() }, image: { url: imageMemes[Math.floor(Math.random() * (imageMemes.length - 1))] } } });
	}

};
