const Music = require('./Music');

class MusicInterface {

	constructor(guild) {
		Object.defineProperty(this, 'client', { value: guild.client });
		Object.defineProperty(this, 'guild', { value: guild });

		this.textChannel = null;
		this.queue = [];
		this.playing = false;
		this.paused = false;
		this.volume = 100;
	}

	add(songdata, requester) {
		const song = new Music(songdata, requester);
		this.queue.push(song);
		return song;
	}

	join(voiceChannel) {
		return this.client.lavalink.join({
			guild: this.guild.id,
			channel: voiceChannel.id,
			host: this.client.lavalink.getIdealHost(this.guild.region)
		}, { selfdeaf: true });
	}

	async leave(force = true) {
		if (this.playing || this.player || force) this.player.stop();
		await this.client.lavalink.leave(this.guild.id);
		this.playing = false;
		return this;
	}

	async play() {
		if (!this.voiceChannel) throw 'No voice channel.';
		if (!this.player) throw 'I could not find a connection.';
		if (this.queue.length === 0) throw 'The queue is empty.';

		const song = this.queue[0];
		this.player.play(song.track);
		this.playing = true;
		return this.player;
	}

	pause() {
		if (!this.player) return null;
		this.player.pause();
		this.paused = true;
		return this;
	}

	resume() {
		if (!this.player) return null;
		this.player.resume();
		this.paused = false;
		return this;
	}

	skip(force = true) {
		if (force && this.player) this.player.stop();
		else this.queue.shift();
		return this;
	}

	prune() {
		this.queue = [];
		return this;
	}

	async destroy() {
		this.queue = null;
		this.playing = null;
		this.textChannel = null;
		this.volume = null;

		await this.leave();
		this.client.music.delete(this.guild.id);
	}

	get voiceChannel() {
		return this.guild.me.voiceChannel;
	}

	get player() {
		return this.client.lavalink.get(this.guild.id) || null;
	}

}

module.exports = MusicInterface;
