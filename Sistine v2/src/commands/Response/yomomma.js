const { Command } = require('klasa');
const snekie = require('snekfetch');
const fetch = require('node-fetch');

module.exports = class YoMommaCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 12,
			aliases: ['yomommasofat', 'yomommajoke'],
			description: "Yo Mamma's So Fat, this joke doesnt even fi"
		});
	}

	async run(msg) {
		const { joke } = await fetch('http://api.yomomma.info/')
			.then((res) => res.json());
		// const { body: { joke } } = await snekie.get('http://api.yomomma.info/');
		return msg.send(`📢 **Yomomma Says** \`${joke}\``);
	}

};
