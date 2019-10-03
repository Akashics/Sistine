const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	// Constructor

	async run(msg) {
		if (!msg.guild) return;
		const nextValue = msg.author.configs.experience + 1;
		const nextLevel = Math.floor(0.1 * Math.sqrt(nextValue + 1));
		await msg.author.configs.update(['experience', 'level'], [nextValue, nextLevel]);
	}


};
