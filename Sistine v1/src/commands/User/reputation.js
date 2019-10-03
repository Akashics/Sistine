const { Command } = require('klasa');

module.exports = class Reputation extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rep'],
			description: 'Give a user a reputal point!',
			usage: '<user:user>'
		});
	}

	async run(msg, [user = msg.author]) {
		if (user.bot || msg.author.bot) return msg.send(msg.language.get('COMMAND_REPUTATION_BOT'));
		if (msg.author.id === user.id) return msg.send(msg.language.get('COMMAND_REPUTATION_SELF'));

		if (Date.now() >= msg.author.configs.reputationTimer) {
			await msg.send(msg.language.get('COMMAND_REPUTATION_SENT', user));
			await msg.author.configs.update('reputationTimer', Date.now() + (12 * 60 * 60 * 1000), msg.guild);
			return user.configs.update('reputation', user.configs.reputation + 1);
		} else {
			return msg.send(msg.language.get('COMMAND_REPUTATION_FROMNOW', msg.author.configs));
		}
	}

};

