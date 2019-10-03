const { Command } = require('klasa');


module.exports = class Cuddle extends Command {

	constructor(...args) {
		super(...args, {
			description: (lang) => lang.get('COMMAND_CUDDLE_DESCRIPTION'),
			usage: '[Cuddler:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_CUDDLE_SOLO', msg.author) :
			msg.language.get('COMMAND_CUDDLE', mentioned, msg.author);
		const embed = await this.client.methods.weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
