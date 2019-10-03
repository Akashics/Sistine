const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['flip', 'headsortails'],
			description: 'Flips a coin',
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		return msg.send(`**${msg.author.username}** flipped a coin.\nIt was **${Math.random() < 0.5 ? 'Tails' : 'Heads'}**`);
	}

};
