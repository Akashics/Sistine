const { Command } = require('klasa');


module.exports = class KissImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (lang) => lang.get('COMMAND_KISS_DESCRIPTION'),
			usage: '[Kisser:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_KISS_SOLO', msg.author) :
			msg.language.get('COMMAND_KISS', mentioned, msg.author);
		const embed = await this.client.methods.weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
