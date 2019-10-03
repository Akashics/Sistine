const { Argument } = require('klasa');
const Song = require('../library/Music/Song');
const { get } = require('snekfetch');

/* eslint-disable no-mixed-operators */

const playlist = /(\?|\&)list=(.*)/i; // eslint-disable-line no-useless-escape
const soundcloud = /https:\/\/soundcloud\.com\/.*/i;
const scPlaylist = /https:\/\/?soundcloud.com\/.*\/.*\/.*/i;
const wcSc = /scsearch:.*/;
const wcYt = /ytsearch:.*/;
const jpop = /(listen.moe|listen moe|listen.moe jpop|listen moe jpop|jpop moe|jpop listen moe|jpop listen.moe|listen.moe\/jpop)/i;
const kpop = /(listen.moe kpop|listen moe kpop|kpop moe|kpop listen moe|kpop listen.moe|listen.moe\/kpop)/i;
const paste = /https:\/\/paste.randomsh.moe\/(.*)/i;
const spotifyList = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/i;
const spotifyUser = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/user\/(\w))/i;
const spotifyAlbum = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;
const spotifyTrack = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/i;

module.exports = class extends Argument {

	/* eslint-disable complexity */
	async run(arg, possible, msg) {
		if (!arg) throw 'Please enter a link, word, artist name, song name, etc. to play.';
		arg = arg.replace(/<(.+)>/g, '$1');
		if (!msg.guild) return null;

		const results = [];
		results.playlist = null;

		const node = msg.guild.music.idealNode;
		if (!node) throw "Couldn't find an ideal region, please try changing your guild region and try again. If the error presists, contact Kashall#0001";
		if (!node.ready) throw `**The current node seems to be having an issue, please contact Kashall#0001 to resolve this issue.**`;
		if (!this.client.config.spotify.token) await this.client.tasks.get('spotify').run();

		const isLink = this.isLink(arg);
		if (isLink) {
			if (playlist.exec(arg) || (soundcloud.exec(arg) && scPlaylist.exec(arg))) {
				const playlistResults = await this.getTracks(node, arg);
				if (!playlistResults || !playlistResults.tracks) throw msg.language.get('ER_MUSIC_NF');
				results.playlist = playlistResults.playlistInfo.name;
				results.push(...playlistResults.tracks);
			} else if (soundcloud.exec(arg)) {
				const scSingleRes = await this.getTracks(node, arg);
				if (!scSingleRes || !scSingleRes.tracks) throw msg.language.get('ER_MUSIC_NF');
				results.push(scSingleRes.tracks[0]);
			} else if (paste.exec(arg)) {
				const rawRes = await get(`https://paste.randomsh.moe/raw/${paste.exec(arg)[1]}`);
				if (!rawRes.body) throw msg.language.get('ER_MUSIC_NF');
				for (const song of JSON.parse(rawRes.body).songs) {
					const songRes = await this.getTracks(node, song);
					if (!songRes || !songRes.tracks) continue;
					results.push(songRes.tracks[0]);
				}
				results.playlist = 'Custom Playlist';
			} else if (spotifyList.exec(arg) || spotifyUser.exec(arg)) {
				let argument = arg;
				if (arg.match(/user/i)) argument = arg.replace(/\/user\/(\w)+/, '');
				if (!spotifyList.exec(argument)) throw msg.language.get('ER_MUSIC_NF');
				const data = await get(`https://api.spotify.com/v1/playlists/${spotifyList.exec(argument)[1]}`)
					.set('Authorization', `Bearer ${this.client.config.spotify.token}`);
				if (data.status !== 200 || !data.body) throw msg.language.get('ER_MUSIC_NF');
				for (const trackData of data.body.tracks.items) {
					const trackRes = await this.getTracks(node, `ytsearch:${trackData.track.artists ? trackData.track.artists[0].name : ''} ${trackData.track.name} audio`);
					if (!trackRes || !trackRes.tracks) continue;
					results.push(trackRes.tracks[0]);
				}
				results.playlist = `${data.body.name}`;
			} else if (spotifyAlbum.exec(arg)) {
				const data = await get(`https://api.spotify.com/v1/albums/${spotifyAlbum.exec(arg)[1]}`)
					.set('Authorization', `Bearer ${this.client.config.spotify.token}`);
				if (data.status !== 200 || !data.body) throw msg.language.get('ER_MUSIC_NF');
				for (const track of data.body.tracks.items) {
					const trackRes = await this.getTracks(node, `ytsearch:${track.artists[0].name} ${track.name} audio`);
					if (!trackRes || !trackRes.tracks) continue;
					results.push(trackRes.tracks[0]);
				}
				results.playlist = `${data.body.name}`;
			} else if (spotifyTrack.exec(arg)) {
				const data = await get(`https://api.spotify.com/v1/tracks/${spotifyTrack.exec(arg)[1]}`)
					.set('Authorization', `Bearer ${this.client.config.spotify.token}`);
				if (data.status !== 200 || !data.body) throw msg.language.get('ER_MUSIC_NF');
				const spotRes = await this.getTracks(node, `ytsearch:${data.body.artists ? data.body.artists[0].name : ''} ${data.body.name} audio`);
				if (!spotRes || !spotRes.tracks) throw msg.language.get('ER_MUSIC_NF');
				results.push(spotRes.tracks[0]);
			} else {
				const httpRes = await this.getTracks(node, arg);
				if (!httpRes || !httpRes.tracks) throw msg.language.get('ER_MUSIC_NF');
				results.push(httpRes.tracks[0]);
			}
		} else if (wcYt.exec(arg) || wcSc.exec(arg)) {
			const wcSearchRes = await this.getTracks(node, arg);
			if (!wcSearchRes || !wcSearchRes.tracks) throw msg.language.get('ER_MUSIC_NF');
			results.push(wcSearchRes.tracks[0]);
		} else if (jpop.exec(arg)) {
			const getJpop = await this.getTracks(node, 'https://listen.moe/stream');
			if (!getJpop || !getJpop.tracks) throw msg.language.get('ER_MUSIC_NF');
			results.push(getJpop.tracks[0]);
		} else if (kpop.exec(arg)) {
			const getKpop = await this.getTracks(node, 'https://listen.moe/kpop/stream');
			if (!getKpop || !getKpop.tracks) throw msg.language.get('ER_MUSIC_NF');
			results.push(getKpop.tracks[0]);
		} else {
			let searchRes = await this.getTracks(node, `ytsearch:${arg}`);
			if (!searchRes || !searchRes.tracks) searchRes = await this.getTracks(node, `scsearch:${arg}`);
			if (!searchRes || !searchRes.tracks) throw msg.language.get('ER_MUSIC_NF');
			const options = searchRes.tracks.slice(0, 5);
			const selection = await msg.prompt([`**Select a Song**\n`,
				`${options.map((selectionss, index) => `➡ \`${++index}\` ${selectionss.info.title} - ${selectionss.info.author} (${this.client.methods.friendlyDuration(selectionss.info.length)})`).join('\n')}`,
				`\n${msg.author}, Please select an option by replying from range \`1-5\` to add it to the queue.`], 20000).catch(() => null);
			if (!selection) throw '**Invalid Option Selected, please select from `1-5`. Cancelled song selection.**';
			const selectedNo = Number(selection.content);
			if (selectedNo <= 0 || selectedNo > 5 || selectedNo !== Number(selectedNo)) throw '**Invalid Option Selected, please select from `1-5`. Cancelled song selection.**';
			results.push(searchRes.tracks[selectedNo - 1]);
		}

		if (!results.length) throw msg.language.get('ER_MUSIC_NF');
		return { tracks: results.filter(a => a && a.track !== undefined).map(track => new Song(track, msg.author)), playlist: results.playlist };
	}

	/**
     * Gets an array of tracks from lavalink REST API
     * @param {Object} node The node to use for REST searches
     * @param {string} search The search string
     * @returns {Array<Object>}
     */
	getTracks(node, search) {
		return this.client.lavalink.getSongs(node, search);
	}

	/**
     * Returns a valid URl that can be accepted by Lavalink
     * @param {string} arg URL which you want to verify
     * @returns {boolean}
     */
	isLink(arg) {
		try {
			new URL(arg); // eslint-disable-line no-new
			return true;
		} catch (error) {
			return false;
		}
	}

};
