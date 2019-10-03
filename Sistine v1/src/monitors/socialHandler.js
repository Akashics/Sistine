const { Monitor } = require('klasa');
const timeout = new Set();
module.exports = class socialMonitor extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false
		});
	}

	giveRandomPoints(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	async givePoints(msg) {
		if (msg.channel.type !== 'text' || msg.author.bot || !msg.guild) return;

		if (timeout.has(msg.author.id)) return;

		const userData = msg.author.configs;
		timeout.add(msg.author.id);
		const points = this.giveRandomPoints(1, 5);

		setTimeout(async () => {
			timeout.delete(msg.author.id);
			await userData.update('balance', userData.balance + points, msg.guild);
		}, 45000);
	}
	async run(msg) {
		await this.givePoints(msg);
	}

};
