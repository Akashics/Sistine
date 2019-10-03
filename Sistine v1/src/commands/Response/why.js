const { Command } = require('klasa');
const snekie = require('snekfetch');

module.exports = class WhyCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 12,
			description: "Someone out there deserves a pat, let's do it!"
		});
	}

	async run(msg) {
		const { body: { why } } = await snekie.get('https://nekos.life/api/why').set('Key', this.client.keys.apis.neko);
		return msg.send(`**Tell me:** ${why}`);
	}

};
