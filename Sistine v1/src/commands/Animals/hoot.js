const { Command } = require('klasa');

module.exports = class Hoot extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['SEND_MESSAGE'],
			description: 'Speak in OWL.',
			usage: '<text:string{1,1000}>'
		});
	}

	async run(msg, [text]) {
		const hooted = text.replace(/\b[^\d\W]+\b/g, 'hoot');
		return msg.send(`**${msg.author.tag}**: ${hooted}`);
	}

};
