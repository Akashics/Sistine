const { Command } = require('klasa');
const snekie = require('snekfetch');

module.exports = class WhyCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 12,
			description: "Why? Why not? Because you can."
		});
	}

	async run(msg) {
		const { body: { why } } = await snekie.get('https://nekos.life/api/why');
		return msg.send(`Why? *${why}*`);
	}

};
