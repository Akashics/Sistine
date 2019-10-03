const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			botPerms: ['ATTACH_FILES'],
			description: '"Borrow" a picture of a random shiba.'
		});
	}

	async run(msg) {
		const result = await fetch('http://shibe.online/api/shibes', this.client.config.fetchHeaders)
			.then((res) => res.json());
		if (typeof result !== 'object') return msg.send('`❌` Owl encountered an unexpected response. Please try again later.');

		const image = await fetch(result[0])
			.then(res => res.buffer());
		const embed = await this.embedAttachment(image);
		return msg.send({ embed });
	}

};
