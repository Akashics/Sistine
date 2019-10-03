const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 8,
			aliases: ['savesong', 'dmcurrentsong'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_DMSONG_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const { queue } = music;
		if (!music.playing || !queue.length) return msg.sendMessage(`｢ **Error** ｣ There's currently no music playing.`);

		const [song] = queue;
		if (!song) return msg.sendMessage(`｢ **Error** ｣ There are no songs available in the queue at this time.`);
		const embed = new MessageEmbed()
			.setColor('#5bc0de')
			.setTitle('Now Playing')
			.setTimestamp()
			.setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Duration:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
		if (!msg.author.send) return msg.sendMessage(`***${msg.language.get('ER_NO_DM')}***`);
		return msg.author.send({ embed }).catch(() => null);
	}

};
