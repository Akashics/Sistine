const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Creates a snapchat based meme.',
			usage: '<Text:string{1,28}>',
			extendedHelp: 'This command uses canvas to generate a Snapchat styled image based on the well known statue meme.'
		});
	}

	async run(msg, [text]) {
		const image = await this.client.idioticApi.snapchat(text);
		return msg.channel.sendFile(image, 'snapchat.png');
	}

};
