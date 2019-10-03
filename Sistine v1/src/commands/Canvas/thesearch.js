const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Creates a meme based on a webcomic.',
			usage: '<Text:string{1,22}>',
			extendedHelp: 'Uses the idiotic api to create a the search meme'
		});
	}

	async run(msg, [text]) {
		const image = await this.client.idioticApi.theSearch(msg.author.displayAvatarURL({ format: 'png', size: 128 }), text);
		return msg.channel.sendFile(image, 'thesearch.png');
	}

};
