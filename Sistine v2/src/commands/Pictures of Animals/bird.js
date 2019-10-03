const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class Birb extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['birb'],
			description: 'Fetch one of those fancy birbs flying around there.'
		});
	}

	async run(msg) {
		const result = await fetch('http://random.birb.pw/tweet.json', this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object') return msg.send('`❌` Birb encountered an unexpected response. Please try again later.');

		const image = await fetch(`http://random.birb.pw/img/${result.file}`)
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image);
		return msg.send({ embed });
	}

};
