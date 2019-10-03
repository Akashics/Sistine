const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 8,
			aliases: ['np', 'currentsong', 'song', 'canzone', 'chanson', 'canción', 'lied'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_NOWPLAYING_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const { queue } = music;
		if (!music.playing) return msg.sendMessage(`｢ **Error** ｣ There are no songs currently playing.`);

		const [song] = queue;
		if (!song) return msg.sendMessage(`｢ **Error** ｣ There are no songs available in the queue at this time.`);
		const embed = new MessageEmbed()
			.setColor('#5bc0de')
			.setTitle(`${msg.language.get('MUSICIF_NOW_PLAYING_TITLE')}`)
			.setTimestamp()
			.setThumbnail(song.artwork || 'https://i.imgur.com/50dTpEN.png')
			.setDescription(`• **${msg.language.get('MUSICIF_TITLE')}:** ${song.title}
• **${msg.language.get('MUSICIF_AUTHOR')}:** ${song.author}
• **${msg.language.get('MUSICIF_SONG_LENGHT')}:** ${song.friendlyDuration}
• **${msg.language.get('MUSICIF_SONG_REQUESTED_BY')}:** ${song.requester}
• **${msg.language.get('MUSICIF_SONG_LINK')}:** ${song.url}`);
		return msg.sendEmbed(embed);
	}

};
