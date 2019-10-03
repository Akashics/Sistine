const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['np', 'currentsong', 'song'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
			description: language => language.get('COMMAND_MUSIC_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { prefix } = msg.guildSettings;
		const embed = new MessageEmbed()
			.setColor('#91c3d2')
			.setTitle('Music Help')
			.setTimestamp()
			.setDescription('Now enjoy music right on your Discord Guild, powered with extreme backend technology where performance is not always compromised.')
			.addField(`• ${prefix}play`, `For Song Selector Use: \`${prefix}play <Song Name>\`, For Playlists, YouTube Video URLs, Soundcloud URLs, Live Streams, etc. use \`${prefix}play <URL>\`, for SoundCloud Search or YouTube Search use: \`${prefix}play <ytsearch|scsearch>:<song name>\`.`) // eslint-disable-line max-len
			.addField(`• ${prefix}stop`, 'Stops the music and clears the queue. Requires `DJ` or above.')
			.addField(`• ${prefix}skip`, 'Skip the current song instantly if there are 3 or less people in the voice channel. It does a vote skip if there are more people. Requires `DJ` or above.')
			.addField(`• ${prefix}pause`, 'Pause the music. Requires Requires `DJ` or above. PATRON ONLY')
			.addField(`• ${prefix}resume`, 'Resume the paused music. Requires Requires `DJ` or above. PATRON ONLY')
			.addField(`• ${prefix}queue`, 'Tells you which all songs are in the queue with more information.')
			.addField(`• ${prefix}lyrics`, 'Enter a song name and get lyrics for it on the go easily.')
			.addField(`• ${prefix}nowplaying`, 'Get information about the currently playing song.')
			.addField(`• ${prefix}dmsong`, 'Direct Messages you the information about the currently playing song.')
			.addField(`• ${prefix}createdj`, 'Tag a user to make them admin, requires Mod or above.')
			.addField(`• ${prefix}loop`, 'Loop a song to repeat everytime it finishes.')
			.addField(`• ${prefix}toggledj`, 'Allow Mod and above to make music commands DJ Mode only.')
			.addField(`• ${prefix}shuffle`, 'Shuffle the song queue to randomize it.')
			.addField(`• ${prefix}volume`, 'Change Volume of Music in Voice Channel.');

		return msg.sendEmbed(embed);
	}

};
