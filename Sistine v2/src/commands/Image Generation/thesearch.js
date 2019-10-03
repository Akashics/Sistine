const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');


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
		const image = await this.client.idioticAPI.theSearch(msg.author.displayAvatarURL({ format: 'png', size: 128 }), text);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` }
			}
		});
	}

};
