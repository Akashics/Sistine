const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class Duck extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: 'The duck walked up to the guy running the stand. Hey! Got any grapes?'
		});
	}

	async run(msg) {
		const result = await fetch(`https://api.chewey-bot.ga/duck?auth=${this.client.config.cheweyapi}`, this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object') return msg.send('`❌` Duck encountered an unexpected response. Please try again later.');

		const image = await fetch(result.data)
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image);
		return msg.send({ embed });
	}

};
