const { Task } = require('klasa');
const snekfetch = require('snekfetch');

/* eslint-disable camelcase */
// API sucks so much that they dont use camelCase

module.exports = class extends Task {

	async run() {
		const { discordbotscouk, discordbotspw, discordbotsorg, discordbotworld, botsfordiscord } = this.client.settings.apiTokens;
		// ////////////////////////////////////////////
		// Discord bot list
		// ////////////////////////////////////////////

		snekfetch.post(`https://discordbots.org/api/bots/353929487018229762/stats`)
			.set('Authorization', discordbotsorg)
			.send({ server_count: this.client.guilds.size, shard_id: this.client.shard.id, shard_count: this.client.shard.count })
			.catch((err) => this.client.console.wtf(`[DiscordBotsOrg] Errored at ${err}`));


		// ////////////////////////////////////////////
		// Bots.discord.pw
		// ////////////////////////////////////////////

		snekfetch.post(`https://bots.discord.pw/api/bots/353929487018229762/stats`)
			.set('Authorization', discordbotspw)
			.send({ server_count: this.client.guilds.size, shard_id: this.client.shard.id, shard_count: this.client.shard.count })
			.catch((err) => this.client.console.wtf(`[DiscordPWListing] Errored at ${err}`));


		// ////////////////////////////////////////////
		// Discord bots.world
		// ////////////////////////////////////////////

		const guild_count = (await this.client.shard.fetchClientValues('guilds.size')).reduce((prev, val) => prev + val, 0);

		snekfetch.post(`https://discordbot.world/api/bot/353929487018229762/stats`)
			.set('Authorization', discordbotworld)
			.send({ guild_count, shard_count: this.client.shard.countt })
			.catch((err) => this.client.console.wtf(`[DiscordBotWorld] Errored at ${err}`));


		// ////////////////////////////////////////////
		// terminal.ink
		// ////////////////////////////////////////////

		snekfetch.post(`https://ls.terminal.ink/api/v1/bots/353929487018229762`)
			.set('Authorization', discordbotscouk)
			.send({ server_count: guild_count })
			.catch((err) => this.client.console.wtf(`[TerminalListings] Errored at ${err}`));

		// ////////////////////////////////////////////
		// bots for discord
		// ////////////////////////////////////////////

		snekfetch.post(`https://botsfordiscord.com/api/v1/bots/353929487018229762`)
			.set('Authorization', botsfordiscord)
			.send({ server_count: guild_count })
			.catch((err) => this.client.console.wtf(`[BotsForDiscord] Errored at: ${err}`));
	}

	init() {
		if (!this.client.configs.schedules.some(task => task.taskName === 'postStats')) {
			this.client.schedule.create('postStats', '*/30 * * * *');
		}
	}

};
