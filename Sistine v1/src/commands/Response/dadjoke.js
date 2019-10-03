const { Command } = require('klasa');
const snekie = require('snekfetch');

module.exports = class DadjokeCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['joke', 'tellmeajoke'],
			description: 'Tells a Stupid Dad Joke.'
		});
	}

	async run(msg) {
		const { text } = await snekie.get('https://icanhazdadjoke.com/').set('Accept', 'text/plain');
		return msg.send(`📢 **Dad Joke Alert:** ${text}`);
	}

};
