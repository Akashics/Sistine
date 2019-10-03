const { Command } = require('klasa');


module.exports = class PokeImage extends Command {

	constructor(...args) {
		super(...args, {
			description: (lang) => lang.get('COMMAND_POKE_DESCRIPTION'),
			usage: '[Poker:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		const action = mentioned === msg.author ?
			msg.language.get('COMMAND_POKE_SOLO', msg.author) :
			msg.language.get('COMMAND_POKE', mentioned, msg.author);
		const embed = await this.client.methods.weebImage(msg, this.client, action);
		return msg.sendEmbed(embed);
	}

};
