const { Command } = require('klasa');
const { weebImage } = require('../../lib/util/Util');

module.exports = class SlapImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (msg) => msg.language.get('COMMAND_SLAP_DESCRIPTION'),
			usage: '[Slapper:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_SLAP_SOLO', msg.author) :
			msg.language.get('COMMAND_SLAP', mentioned, msg.author);
		const embed = await weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
