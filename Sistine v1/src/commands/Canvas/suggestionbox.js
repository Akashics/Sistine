const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Creates a meme based on a webcomic.',
			usage: '<Suggestion:string{1,22}>',
			extendedHelp: 'Uses the idiotic api to create a suggestion meme'
		});
	}

	async run(msg, [text]) {
		const image = await this.client.idioticApi.suggestion(msg.author.displayAvatarURL({ format: 'png', size: 256 }), text);
		return msg.channel.sendFile(image, 'suggestion.png');
	}

};
