const { Command } = require('klasa');
const snekie = require('snekfetch');

module.exports = class ChucknorrisCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			description: 'Tells a Chuck Norris Joke.'
		});
	}

	async run(msg) {
		const { body: { value } } = await snekie.get(`http://api.chucknorris.io/jokes/random`);
		return msg.send(`**Chuck Norris:** *${value}*`);
	}

};
