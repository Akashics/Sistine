const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', Guild => {
	class SistineGuild extends Guild {

		get music() {
			return this.client.music.get(this.id) || this.client.music.add(this);
		}

	}
	return SistineGuild;
});
