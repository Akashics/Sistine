const { Command } = require('klasa');
const snekie = require('snekfetch');

module.exports = class YoMommaCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 12,
			aliases: ['yomommasofat', 'yomommajoke'],
			description: "Who doesn't like some YoMomma jokes? Let's read them with me"
		});
	}

	async run(msg) {
		const { body: { joke } } = await snekie.get('http://api.yomomma.info/');
		return msg.send(`📢 **Yomomma Joke:** *${joke}*`);
	}

};
