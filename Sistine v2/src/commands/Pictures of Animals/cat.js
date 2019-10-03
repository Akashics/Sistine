const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class Cat extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['randomcat', 'catto'],
			description: 'Meow. Its french for "I\'m hungry again"'
		});
	}

	async run(msg) {
		const result = await fetch(`https://api.chewey-bot.ga/cat?auth=${this.client.config.cheweyapi}`, this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object') return msg.send('`❌` Cat encountered an unexpected response. Please try again later.');

		const image = await fetch(result.data)
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image).setFooter(`Request handled by api.chewey-bot.ga`);
		return msg.send({ embed });
	}

};
