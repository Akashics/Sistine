const { Monitor } = require('klasa');

const timeout = new Set();

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false
		});
	}

	async run(msg) {
		if (!msg.guild) return;
		if (timeout.has(msg.author.id)) return;
		await msg.author.settings.sync(true);
		if (!msg.author.settings) return;

		const randomXP = this.client.methods.randomNumber(1, 5);
		const randomFlowers = this.client.methods.randomNumber(1, 2);
		const newFlowers = msg.author.settings.newFlowers + randomFlowers;
		const newXP = msg.author.settings.xp + randomXP;
		const oldLvl = msg.author.settings.level;
		const newLvl = Math.floor(0.2 * Math.sqrt(newXP));
		await msg.author.settings.update([['xp', newXP], ['level', newLvl], ['snowflakes', newFlowers]]);

		timeout.add(msg.author.id);
		setTimeout(() => timeout.delete(msg.author.id), 45000);
		if (oldLvl !== newLvl) {
			if (!msg.guild.settings.levelup) return;
			if (msg.guild.settings.leveltype !== 'user') return;
			if (!msg.channel.postable) return;
			msg.sendMessage(`📜 **${msg.author.tag}** has reached level **${newLvl}**!`);
		}
	}

};
