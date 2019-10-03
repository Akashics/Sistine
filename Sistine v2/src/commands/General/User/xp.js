const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Check how many points you have.', aliases: ['experience'] });
	}

	async run(msg) {
		return msg.sendMessage(`You have a total of **${msg.author.settings.xp}** experience points. You need to earn ${Math.floor(((msg.author.settings.level + 1) / 0.2) ** 2)} to level up.`);
	}

};
