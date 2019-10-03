const { Command } = require('klasa');


module.exports = class HugImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (lang) => lang.get('COMMAND_HUG_DESCRIPTION'),
			usage: '[Hugger:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_HUG_SOLO', msg.author) :
			msg.language.get('COMMAND_HUG', mentioned, msg.author);
		const embed = await this.client.methods.weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
