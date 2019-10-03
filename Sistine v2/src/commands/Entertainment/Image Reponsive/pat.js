const { Command } = require('klasa');


module.exports = class PatImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (lang) => lang.get('COMMAND_PAT_DESCRIPTION'),
			usage: '[Patter:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_PAT_SOLO', msg.author) :
			msg.language.get('COMMAND_PAT', mentioned, msg.author);
		const embed = await this.client.methods.weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
