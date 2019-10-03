const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

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
		const image = await this.client.idioticAPI.snapchat(text);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
