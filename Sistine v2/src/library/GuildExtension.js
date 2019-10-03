const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', Guild => {
	class ClientGuild extends Guild {

		get music() {
			return this.client.music.add(this);
		}

	}
	return ClientGuild;
});
