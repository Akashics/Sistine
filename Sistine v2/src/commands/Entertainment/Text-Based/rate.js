const { Command } = require('klasa');

module.exports = class Rate extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rate-waifu'],
			description: (lang) => lang.get('COMMAND_RATE_DESCRIPTION'),
			usage: '<Person:str>',
			cooldown: 5
		});
	}

	async run(msg, [user]) {
		if (/^(you|yourself|Senko-san)$/i.test(user)) {
			return msg.send(msg.language.get('COMMAND_RATE_MYSELF'));
		} else {
			if (/^(myself|me)$/i.test(user)) user = msg.author.username;
			const bg = Buffer.from(user.toLowerCase()).readUInt32BE(0, user.length);
			const rng = user.length * Math.abs(Math.sin(bg)) * 10;
			return msg.send(msg.language.get('COMMAND_RATE_WAIFU', user, 100 - Math.round((bg * rng) % 100)));
		}
	}

};
