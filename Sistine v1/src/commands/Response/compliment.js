const { Command } = require('klasa');
const { Compliments } = require('../../lib/util/Constants');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Compliments a person mentioned.',
			usage: '[UserToCompliment:username]',
			runIn: ['text']
		});
	}

	async run(msg, [user = msg.author]) {
		return msg.send(`${user.tag}: ${Compliments[Math.floor(Math.random() * Compliments.length)]}`);
	}

};
