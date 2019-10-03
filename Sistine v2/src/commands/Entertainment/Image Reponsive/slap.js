const { Command } = require('klasa');


module.exports = class SlapImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (lang) => lang.get('COMMAND_SLAP_DESCRIPTION'),
			usage: '[Slapper:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_SLAP_SOLO', msg.author) :
			msg.language.get('COMMAND_SLAP', mentioned, msg.author);
		const embed = await this.client.methods.weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
