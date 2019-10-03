const { Command } = require('klasa');

module.exports = class Compliment extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['praise'],
			description: (lang) => lang.get('COMMAND_COMPLIMENT_DESCRIPTION'),
			usage: '[User:user]'
		});
	}

	async run(msg, [user = msg.author]) {
		return msg.send(msg.language.get('COMMAND_COMPLIMENT', user.username));
	}

};
