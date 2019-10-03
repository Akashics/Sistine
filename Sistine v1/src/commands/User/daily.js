const { Command, Duration } = require('klasa');
const DBL = require('dblapi.js');

module.exports = class Daily extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Collect your daily points!',
			usage: '[user:user]'
		});
	}

	async run(msg, [user = msg.author]) {
		if (user.bot || msg.author.bot) return msg.send(msg.language.get('COMMAND_REPUTATION_BOT'));
		const DBLAPI = new DBL(this.client.settings.apiTokens.discordbotsorg, this.client);

		const payer = msg.author.configs;
		const payee = user.configs;
		const pointsReward = DBLAPI.hasVoted(msg.author.id) ? 500 : 250;

		if (Date.now() <= payer.dailyTimer) return msg.send(msg.language.get('COMMAND_DAILY_FROMNOW', Duration.toNow(payer.dailyTimer)));
		await msg.send(msg.language.get(`COMMAND_DAILY_${payer === payee ? 'CLAIMED' : 'DONATED'}`, pointsReward, msg.author.username, user.username));
		await payer.update('dailyTimer', Date.now() + (12 * 60 * 60 * 1000), msg.guild);
		return payee.update('balance', payee.balance + pointsReward, msg.guild);
	}

};

