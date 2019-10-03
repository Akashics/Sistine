const { Command } = require('klasa');
const subReddits = ['realgirls', 'amateur', 'homemadexxx', 'AmateurArchives', 'dirtypenpals', 'FestivalSluts', 'CollegeAmateurs', 'amateurcumsluts', 'nsfw_amateurs', 'funwithfriends', 'randomsexiness', 'amateurporn', 'normalnudes'];
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 8,
			aliases: ['amateurnsfw'],
			nsfw: true,
			requiredPermissions: ['ATTACH_IMAGES', 'EMBED_LINKS'],
			description: language => language.get('COMMAND_AMETEUR_DESCRIPTION'),
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
			return msg.sendMessage({ embed: embed });
		} catch (err) {
			return msg.sendMessage(`There was an error, try again!`);
		}
	}

};
