const { Monitor, Duration } = require('klasa');

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
		if (!msg.mentions.users.size) return;
		const mentioned = msg.mentions.users.first();
		const afk = await this.client.afks.get(mentioned.id);
		if (!afk) return;
		msg.send(`**${mentioned.username}** has been afk for ${afk.message} about ${Duration.toNow(afk.time)} ago.`);
	}

};
