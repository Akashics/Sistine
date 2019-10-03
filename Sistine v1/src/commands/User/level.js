const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Check your current level.' });
	}

	async run(msg) {
		return msg.sendMessage(`You are currently level **${msg.author.configs.level}**!`);
	}

};
