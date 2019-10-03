const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['music-play'],
			description: 'Play a song',
			usage: '<Song:songname>'
		});

		this.delayer = time => new Promise(res => setTimeout(() => res(), time));
	}

	async run(msg, [songs]) {
		if (!msg.member) {
			await msg.guild.members.fetch(msg.author.id).catch(() => {
				throw 'Unable to fetch your user data due to a Discord Issue, wait a bit then try again.';
			});
		}
		const { voiceChannel } = msg.member;
		if (!voiceChannel) throw 'You must be in a voice channel for me to join you.';
		this.resolvePermissions(msg, voiceChannel);
		const { music } = msg.guild;
		music.textChannel = msg.channel;

		return this.handle(msg, songs);
	}

	async handle(msg, songs) {
		const musicInterface = msg.guild.music;

		if (!musicInterface.playing) await this.handleSongs(msg, songs, true);
		if (musicInterface.playing) return this.handleSongs(msg, songs, false);

		try {
			await musicInterface.join(msg.member.voiceChannel);
			return this.play(musicInterface);
		} catch (error) {
			this.client.console.error(error);
			return musicInterface.textChannel.send(`Voice Channel Error: ${error}`).then(() => musicInterface.destroy());
		}
	}

	handleSongs(msg, songs, first = false) {
		const { music } = msg.guild;
		if (songs.isPlaylist) {
			for (const song of songs) music.add(song, msg.member);
			if (first === false) return msg.send(`Added **${songs.length}** songs to the queue based of your playlist.`);
		}
		const addedSong = music.add(songs[0], msg.member);
		if (first === false) return msg.send(`**${addedSong.title}** has been added to the queue!`);
		return null;
	}

	async play(musicInterface) {
		const song = musicInterface.queue[0];

		if (!song) {
			return musicInterface.textChannel.send(':stop_button: The queue ran out of songs to play, add some more!').then(() => musicInterface.destroy());
		}

		await this.delayer(500);

		return musicInterface.play(song.track)
			.then(async player => {
				await musicInterface.textChannel.send(`:headphones: Playing: **${song.title}** as requested by: **${song.requester}**.`);
				player.once('end', data => {
					if (data.reason === 'REPLACED') return;
					musicInterface.queue.shift();
					this.play(musicInterface);
				});
			});
	}

	resolvePermissions(msg, voiceChannel) {
		const permissions = voiceChannel.permissionsFor(msg.guild.me);

		if (permissions.has('CONNECT') === false) throw 'I do not have enough permissions to connect to your voice channel. I am missing the CONNECT permission.';
		if (permissions.has('SPEAK') === false) throw 'I can connect... but not speak. Please turn on this permission so I can emit music.';
	}

};
