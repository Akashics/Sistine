const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: 'For Safety: You should see the "hoot" command\'s description.'
		});
	}

	async run(msg) {
		const result = await fetch('http://pics.floofybot.moe/owl', this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object') return msg.send('`❌` Owl encountered an unexpected response. Please try again later.');

		const image = await fetch(result.image)
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image);
		return msg.send({ embed });
	}

};
