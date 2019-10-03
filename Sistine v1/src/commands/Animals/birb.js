const { Command } = require('klasa');
const snek = require('snekfetch');

module.exports = class Birb extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bird'],
			description: (msg) => msg.language.get('COMMAND_BIRB_DESCRIPTION')
		});
	}

	async run(msg) {
		const { text } = await snek.get('http://random.birb.pw/tweet.json');
		const { file } = JSON.parse(text);
		return msg.send({ files: [`http://random.birb.pw/img/${file}`] });
	}

};
