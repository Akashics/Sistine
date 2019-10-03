const { Command } = require('klasa');

module.exports = class PassGen extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Generate a random string/password in your DMs',
			usage: '<text:string>'
		});
	}

	async makeID(number) {
		number = parseInt(number);
		let text = '';
		const possible = '!@#$%^&*()/;:[]}{-_~?.,<>|=+!@#$%^&*()/;:[]}{-_~?.,<>|=+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < number; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	async run(msg, [number]) {
		return msg.author.send(`**[Randomly Generated Token]**\n\`${this.makeID(number)}\``);
	}

};

