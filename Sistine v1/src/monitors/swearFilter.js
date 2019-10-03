const { Monitor } = require('klasa');

module.exports = class swearFilter extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false
		});
	}

	async run(msg) {
		if (msg.channel.type !== 'text') return null;
		if (!msg.guild.available) return null;
		const { configs } = msg.guild;
		if (configs.moderation.swearWords.length >= 0) return null;
		if (msg.deletable && new RegExp(configs.moderation.swearWords.join('|'), 'i').test(msg.content)) await msg.delete();
		return null;
	}

};
