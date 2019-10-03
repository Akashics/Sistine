const { Guild, Collection } = require('discord.js');
const MusicInterface = require('./MusicInterface');

class MusicManager extends Collection {

	constructor(client) {
		super();
		Object.defineProperty(this, 'client', { value: client });
	}

	/**
     * Create a new interface.
     * @param {Discord.Guild} guild A Guild instance.
     * @returns {MusicInterface}
     */
	add(guild) {
		if (!(guild instanceof Guild)) throw "The parameter 'Guild' must be a guild instance.";
		const guildInterface = new MusicInterface(guild);
		super.set(guild.id, guildInterface);
		return guildInterface;
	}

}

module.exports = MusicManager;
