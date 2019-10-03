const { Command } = require('klasa');
const { weebImage } = require('../../lib/util/Util');

module.exports = class PatImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (msg) => msg.language.get('COMMAND_PAT_DESCRIPTION'),
			usage: '[Patter:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_PAT_SOLO', msg.author) :
			msg.language.get('COMMAND_PAT', mentioned, msg.author);
		const embed = await weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
