const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Assign the blame to another user thru a canvas based api',
			usage: '[user:username]',
			extendedHelp: 'Uses the idiotic api to assign the blame to someone else'
		});
	}

	async run(msg, [blamed = msg.author]) {
		const image = await this.client.idioticAPI.blame(blamed.username);
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(image, `${this.name}.png`)],
				color: 3553598,
				image: { url: `attachment://${this.name}.png` },
				description: `${msg.author.username} blames ${blamed.username === msg.author.username ? 'themselves' : blamed.username}!`,
				footer: {
					text: `${this.client.user.username} - Requested by ${msg.author.tag}`,
					icon_url: this.client.user.displayAvatarURL() // eslint-disable-line
				}
			}
		});
	}

};
