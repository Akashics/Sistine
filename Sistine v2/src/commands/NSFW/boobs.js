const { Command } = require('klasa');
const subReddits = ['boobies', 'tinytits', 'TittyDrop', 'burstingout', 'boltedontits', 'boobbounce', 'boobs', 'downblouse', 'cleavage', 'pokies'];
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 8,
			aliases: ['boobies'],
			nsfw: true,
			requiredPermissions: ['ATTACH_IMAGES', 'EMBED_LINKS'],
			description: language => language.get('COMMAND_BOOBS_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		if (!msg.channel.nsfw) return msg.sendMessage(`**This channel is not NSFW so I can't send it here...**`);
		try {
			let img = await this.client.methods.scrapeSubreddit(subReddits[Math.floor(Math.random() * subReddits.length)]);
			if (!img) return msg.sendMessage(`Too fast, too furious, try again!`);
			if (img.indexOf('.mp4')) {
				img = await this.client.methods.scrapeSubreddit(subReddits[Math.floor(Math.random() * subReddits.length)]);
			}
			const embed = new MessageEmbed()
				.setFooter(this.client.user.tag)
				.setTimestamp()
				.setImage(img)
				.setColor('RANDOM');
			return msg.sendMessage({ embed });
		} catch (err) {
			console.log(err);
			return msg.sendMessage(`There was an error, try again!`);
		}
	}

};
