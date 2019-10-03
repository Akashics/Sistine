const { Command } = require('klasa');

module.exports = class Binary extends Command {

	constructor(...args) {
		super(...args, {
			description: (msg) => msg.language.get('COMMAND_BINARY_DESCRIPTION'),
			usage: '<Text:str>'
		});
	}

	async run(msg, [string]) {
		return msg.send(`\`\`\`\n${string.split('').map(char => char.charCodeAt(0).toString(2)).join(' ')}\n\`\`\``);
	}

};

