const { Command } = require('klasa');

module.exports = class Daily extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Collect your daily points!',
			usage: '[user:user]'
		});
	}

	async run(msg, [user = msg.author]) {
		if (user.bot) {
			return msg.sendMessage('🌺 | You can not give your daily flowers to a bot!');
		}

		await msg.author.settings.sync(true);

		// const upvoter = await this.client.funcs.isUpvoter(msg.author);
		// const reward = upvoter ? 300 : 100;

		const reward = 150;
		if (msg.author.settings.daily > 0) {
			const now = Date.now();
			const last = msg.author.settings.daily;
			const diff = now - last;
			const next = 43200000 - diff;

			const hours = Math.floor(next / 3600000);
			const minutes = Math.floor((next / 60000) - (hours * 60));
			const seconds = (next / 1000) - ((hours * 3600) + (minutes * 60));
			const timeLeft = `${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds`;

			if (diff >= 43200000) {
				await user.settings.update([['flowers', user.settings.flowers + reward], ['daily', Date.now()]]);
				return msg.reply(`🌺 | You have claimed your ${reward} flowers for today!`);
			} else {
				return msg.sendMessage(`🌺 | You can claim your daily flowers in ${timeLeft}!`);
			}
		} else {
			await user.settings.update([['flowers', user.settings.flowers + reward], ['daily', Date.now()]]);
			return msg.reply(`🌺 | You have claimed your ${reward} flowers for today!`);
		}
	}

};

