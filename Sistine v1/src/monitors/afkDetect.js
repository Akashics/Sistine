const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false
		});
	}

	async run(msg) {
		const isAfk = await this.client.afks.has(msg.author.id);
		if (!isAfk) return;
		await this.client.afks.delete(msg.author.id);
		const amsg = await msg.send(`**${msg.author.username}** has came back, you are no longer afk.`);
		await amsg.delete({ timeout: 10000, reason: 'Sistine AFK Feature' });
	}

};
