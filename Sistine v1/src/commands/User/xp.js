const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Check how many points you have.', aliases: ['experience'] });
	}

	async run(msg) {
		return msg.sendMessage(`You have a total of **${msg.author.configs.experience}** experience points!`);
	}

};
