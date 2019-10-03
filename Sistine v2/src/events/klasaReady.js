const { Event } = require('klasa');
const MusicClient = require('../library/Music/LavalinkClient');

module.exports = class extends Event {

	async run() {
		// Setup lavalink
		this.client.stats.increment('Senko-san.starts');
		this.client.lavalink = new MusicClient(this.client, this.client.config.nodes);
	}

};
