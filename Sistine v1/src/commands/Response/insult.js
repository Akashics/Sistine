const { Command } = require('klasa');
const { Insluts: { Start, Middle, End } } = require('../../lib/util/Constants');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Insult someone with some very bad insults that I offers you.',
			usage: '<Insulted:username>'
		});
	}

	async run(msg, [insulted]) {
		const start = Start[Math.floor(Math.random() * Start.length)];
		const middle = Middle[Math.floor(Math.random() * Middle.length)];
		const end = End[Math.floor(Math.random() * End.length)];
		return msg.send(`${insulted}, you know what? you're nothing but ${start} ${middle} ${end}.`);
	}

};
