const { Command } = require('klasa');
const snek = require('snekfetch');

module.exports = class Dog extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['randomdog', 'doggo'],
			description: (msg) => msg.language.get('COMMAND_DOG_DESCRIPTION')
		});
	}

	async run(msg) {
		const { body: { message } } = await snek.get('https://dog.ceo/api/breeds/image/random');
		return msg.send({ files: [message] });
	}

};
