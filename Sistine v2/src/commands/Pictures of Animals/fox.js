const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class Fox extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: 'No one really knows what the fox said.'
		});
	}

	async run(msg) {
		const result = await fetch('https://randomfox.ca/floof/', this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object') return msg.send('`❌` Fox encountered an unexpected response. Please try again later.');

		const image = await fetch(result.image)
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image);
		return msg.send({ embed });
	}

};
