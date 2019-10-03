const { Task } = require('klasa');
const { Util: { binaryToID } } = require('discord.js');

// THRESHOLD equals to 30 minutes in milliseconds:
//     - 1000 milliseconds = 1 second
//     - 60 seconds        = 1 minute
//     - 60 minutes        = 1 hour
const THRESHOLD = 1000 * 60 * 60,
	EPOCH = 1420070400000,
	EMPTY = '0000100000000000000000';

// The header with the console colours
const HEADER = `\u001B[39m\u001B[94m[SISTINE MEM SWEEP]\u001B[39m\u001B[90m`;

/**
 * @since 1.0.0
 * @extends {Task}
 */
module.exports = class MemorySweeper extends Task {

	async run() {
		const OLD_SNOWFLAKE = binaryToID(((Date.now() - THRESHOLD) - EPOCH).toString(2).padStart(42, '0') + EMPTY);
		let presences = 0, guildMembers = 0, lastMessage = 0, users = 0;

		// Per-Guild sweeper
		for (const guild of this.client.guilds.values()) {
			// Clear presences
			presences += guild.presences.size;
			guild.presences.clear();

			if (guild.id !== '324051061033926666') guild.emojis.clear();

			// Clear members that haven't send a message in the last 30 minutes
			const { me } = guild;
			for (const [id, member] of guild.members) {
				if (member === me) continue;
				if (member.voiceChannelID) continue;
				if (member.lastMessageID && member.lastMessageID < OLD_SNOWFLAKE) continue;
				guildMembers++;
				guild.members.delete(id);
			}
		}

		// Per-Channel sweeper
		for (const channel of this.client.channels.values()) {
			if (channel.type === 'voice') continue;
			if (channel.lastMessageID) {
				channel.lastMessageID = null;
				lastMessage++;
			}
		}

		// Per-User sweeper
		for (const user of this.client.users.values()) {
			if (user.lastMessageID && user.lastMessageID < OLD_SNOWFLAKE) continue;
			user.lastMessageID = null;
			this.client.users.delete(user.id);
			lastMessage++;
			users++;
		}

		// log
		this.client.console.log(`${HEADER} ${
			this.setColor(presences)} [Presence]s | ${
			this.setColor(guildMembers)} [GuildMember]s | ${
			this.setColor(users)} [User]s | ${
			this.setColor(lastMessage)} [Last Message]s.`);
	}

	/**
	 * Set a colour depending on the amount:
	 * > 1000 : Light Red colour
	 * > 100  : Light Yellow colour
	 * < 100  : Green colour
	 * @since 3.0.0
	 * @param {number} number The number to colourise
	 * @returns {string}
	 */
	setColor(number) {
		const text = String(number).padStart(5, ' ');
		// Light Red color
		if (number > 1000) return `\u001B[39m\u001B[91m${text}\u001B[39m\u001B[90m`;
		// Light Yellow color
		if (number > 100) return `\u001B[39m\u001B[93m${text}\u001B[39m\u001B[90m`;
		// Green color
		return `\u001B[39m\u001B[32m${text}\u001B[39m\u001B[90m`;
	}

	init() {
		if (!this.client.configs.schedules.some(task => task.taskName === 'cache')) {
			this.client.schedule.create('cache', '*/10 * * * *');
		}
	}

};
