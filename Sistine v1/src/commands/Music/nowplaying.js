const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['EMBED_LINKS'],
			description: 'Get information from the current song.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.playing) return msg.sendMessage("***There's currently no music playing!***");
		if (!music.queue.length) throw '***There are no songs in queue!***';


		const song = music.queue[0];
		const embed = new MessageEmbed()
			.setColor('#5bc0de')
			.setTitle('⏯ | Now Playing - PenguBot')
			.setTimestamp()
			.setFooter('© PenguBot.cc')
			.setDescription([`• **Song:** ${song.trackTitle}`,
				`• **Author:** ${song.author}`,
				`• **Duration:** ${song.stream === true ? 'Live Stream' : song.trackFriendlyDuration}`,
				`• **Requested By:** ${song.requester.tag}`,
				`• **Link:** ${song.trackURL}`]);
		return msg.sendEmbed(embed);
	}

};
