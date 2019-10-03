const { Command } = require('klasa');
const { Util } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			aliases: ['exec', 'ex'],
			description: (msg) => msg.language.get('COMMAND_EXECUTE_DESCRIPTION'),
			usage: '<command:string>'
		});
	}

	async run(msg, [code]) {
		const result = await Util.exec(code, { timeout: 30000 })
			.catch(error => ({ stdout: null, stderr: error && error.message ? error.message : error }));

		const output = result.stdout ?
			`**\`OUTPUT\`**${'```prolog'}\n${result.stdout}\n${'```'}` :
			'';

		const outerr = result.stderr ?
			`**\`ERROR\`**${'```prolog'}\n${result.stderr}\n${'```'}` :
			'';

		return msg.send([output, outerr].join('\n'));
	}

};
