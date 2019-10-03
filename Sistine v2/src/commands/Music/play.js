const MusicCommand = require('../../library/Music/MusicCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: false,
			cooldown: 5,
			aliases: ['musicplay', 'suona', 'accoda', 'joue', 'toca', 'spielt'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS', 'ATTACH_FILES'],
			description: language => language.get('COMMAND_PLAY_DESCRIPTION'),
			usage: '<song:songname>',
			extendedHelp: 'No extended help available.'
		});
		this.delayer = time => new Promise(res => setTimeout(() => res(), time));
	}

	async run(msg, [songs]) {
		await msg.guild.members.fetch(msg.author.id).catch(() => {
			throw msg.language.get('ER_MUSIC_TRIP');
		});

		const { music } = msg.guild;
		music.textChannel = msg.channel;

		const { channel } = msg.member.voice;
		if (!channel) throw '｢ **Error** ｣ You are not in a voice channel';
		this.resolvePermissions(msg, channel);

		return this.handle(msg, songs);
	}

	async handle(msg, songs) {
		const musicInterface = msg.guild.music;
		try {
			if (!musicInterface.playing) await this.handleSongs(msg, songs);
			else return this.handleSongs(msg, songs);

			await musicInterface.join(msg.member.voice.channel);
			return this.play(musicInterface);
		} catch (error) {
			this.client.console.error(error);
			return musicInterface.textChannel.send(`｢ **Error** ｣ Please report this error to <https://discord.gg/jgPNHWy>\n\`\`\`fix\n${error}\`\`\``).then(() => musicInterface.destroy());
		}
	}

	async handleSongs(msg, songs) {
		const musicInterface = msg.guild.music;
		if (songs.tracks.length > 1) {
			const limit = 1000;
			const limitedSongs = songs.tracks.slice(0, limit);
			musicInterface.queue.push(...limitedSongs);
			return msg.send(`｢ **Queue** ｣ Added **${songs.tracks.length}** songs from **${songs.playlist}** to the queue based on your playlist.`);
		} else {
			musicInterface.queue.push(...songs.tracks);
			if (!musicInterface.playing) return '';
			musicInterface.playing = true;
			return msg.send(this.queueEmbed(songs.tracks[0]));
		}
	}

	async play(musicInterface) {
		const [song] = musicInterface.queue;

		if (!song) {
			if (!musicInterface.textChannel || musicInterface.textChannel.deleted) return musicInterface.destroy();
			return musicInterface.textChannel.send(this.stopEmbed).then(() => musicInterface.destroy());
		}

		await this.delayer(250);

		return musicInterface.play(song.track)
			.then(async player => {
				musicInterface.playing = true;
				if (!musicInterface.looping) await musicInterface.textChannel.send(this.playEmbed(song));
				player.once('end', data => {
					if (data.reason === 'REPLACED') return;
					if (!musicInterface.looping) musicInterface.skip(false);
					this.play(musicInterface);
				});
				player.once('error', err => {
					musicInterface.textChannel.send(`｢ **Error** ｣ An error has occured with the player. Please report this to <https://discord.gg/jgPNHWy>\n\`\`\`fix\n${err.error}\`\`\``);
					if (musicInterface.looping || musicInterface.queue.length < 2) musicInterface.destroy();
				});
			});
	}

	resolvePermissions(msg, voiceChannel) {
		const permissions = voiceChannel.permissionsFor(msg.guild.me);
		if (voiceChannel.userLimit > 0 && voiceChannel.userLimit <= voiceChannel.members.size) throw '｢ **Error** ｣ Well then. I was told there was a party, not this big of a part. Your channel has no room for me to join!';
		if (permissions.has('CONNECT') === false) throw "｢ **Error** ｣ I don't have permissions to join your channel. I am missing the `CONNECT` permission.";
		if (permissions.has('SPEAK') === false) throw '｢ **Error** ｣ I can connect... but not speak. Please turn on this permission so I can spit some bars.';
	}

	// Response Embeds
	playEmbed(song) {
		return new MessageEmbed()
			.setTitle('Now Playing')
			.setTimestamp()
			.setColor('#5cb85c')
			.setThumbnail(song.artwork)
			.setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Length:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
	}

	queueEmbed(song) {
		return new MessageEmbed()
			.setTitle('Song Queued')
			.setTimestamp()
			.setColor('#eedc2f')
			.setThumbnail(song ? song.artwork || 'https://i.imgur.com/50dTpEN.png' : 'https://i.imgur.com/50dTpEN.png')
			.setDescription(`• **Title:** ${song ? song.title : 'No Name'}
• **Author:** ${song ? song.author : 'No Name'}
• **Length:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
	}

	get stopEmbed() {
		return new MessageEmbed()
			.setTitle('Queue Finished')
			.setTimestamp()
			.setColor('#d9534f')
			.setDescription(`• **Party's Over:** All the songs from the queue have finished playing. Leaving voice channel.`);
	}

};
