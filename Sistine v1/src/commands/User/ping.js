const { Command } = require('klasa');

module.exports = class Ping extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (msg) => msg.language.get('COMMAND_PING_DESCRIPTION')
		});
		this.pinging = [
			'Russia',
			'the USA',
			'your dead server',
			'discordapp.com',
			'youtube.com',
			'the suicide hotlines',
			'NotSoBot',
			"SpaceX's starman",
			'Logan Paul',
			'Post Malone',
			'Donald Trump',
			'a bad soundcloud rapper',
			'Kashall',
			'your mom',
			'ringa ding',
			'a shitty teen house party',
			'the crackhouse on 17th street',
			'Pixilia',
			'twitter dot com',
			'the middle east',
			'my pug named Bazooka',
			'Runescape',
			'the pentagon',
			'the middle of Australia',
			'Africa',
			'Toto - Africa',
			'Jake Paul',
			'the Logangers',
			'the Jake Paulers',
			'ISIS',
			'Tupac',
			'the dark side of the moon',
			'a group of juggalos',
			'Hopsin fans',
			'Eminem',
			'discordbots.org',
			'the Bee Movie',
			'some discord server raiders',
			'Ookla speed tests',
			'Comcast',
			"Discord's API 10000 times",
			"Owen Wilson's nose",
			'superiorservers',
			'AT&T',
			'b1nzy',
			"b1nzy's cat",
			'hypesquad',
			'my dad',
			'aaaaaaaaaaaaa'
		];
	}

	async run(msg) {
		const message = await msg.sendMessage(msg.language.get('COMMAND_PING'));
		const number = Math.floor(Math.random() * 10) + 1;
		const time = (message.editedTimestamp || message.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp);
		if (number >= 5) {
			return msg.send(`${msg.author.username}, It took **${time}ms** to ping ${this.pinging[Math.floor(Math.random() * this.pinging.length)]}.`);
		}
		return msg.send(msg.language.get('COMMAND_PINGPONG', time, msg.author.username));
	}

};
