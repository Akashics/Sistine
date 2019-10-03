const { Command } = require('klasa');

module.exports = class Roast extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['burn'],
			description: (msg) => msg.language.get('COMMAND_ROAST_DESCRIPTION'),
			usage: '[User:user]'
		});
	}

	async run(msg, [user = msg.author]) {
		return msg.send(msg.language.get('COMMAND_ROAST', user.username));
	}

};
