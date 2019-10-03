const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class Dog extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['randomdog', 'doggo'],
			description: 'Based on the popular song that goes "Who let the dogs out."'
		});
	}

	async run(msg) {
		const result = await fetch('https://dog.ceo/api/breeds/image/random', this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object' && result.status === 'success') return msg.send('`❌` Doggo encountered an unexpected response. Please try again later.');

		const image = await fetch(result.message)
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image);
		return msg.send({ embed });
	}

};
