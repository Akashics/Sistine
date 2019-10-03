const { Argument, util: { regExpEsc } } = require('klasa');
const { Guild, Message } = require('discord.js');

const GUILD_REGEXP = new RegExp(/^(\d{17,19})$/);

module.exports = class extends Argument {

	run(arg, possible, msg) {
		if (!msg.guild) return this.client.arguments.get('guild').run(arg, possible, msg);
		const resGuild = this.resolveGuild(arg);
		if (resGuild) return resGuild;

		const results = [];
		const reg = new RegExp(regExpEsc(arg), 'i');
		for (const guild of this.client.guilds.values()) {
			if (reg.test(guild.name)) results.push(guild);
		}

		let querySearch;
		if (results.length > 0) {
			const regWord = new RegExp(`\\b${regExpEsc(arg)}\\b`, 'i');
			const filtered = results.filter(guild => regWord.test(guild.name));
			querySearch = filtered.length > 0 ? filtered : results;
		} else {
			querySearch = results;
		}

		switch (querySearch.length) {
			case 0: throw `${possible.name} Must be a valid name or id`;
			case 1: return querySearch[0];
			default: throw `Found multiple matches: \`${querySearch.map(guild => guild.name).join('`, `')}\``;
		}
	}

	resolveGuild(query) {
		if (query instanceof Guild) return this.client.guilds.has(query.id) ? query : null;
		if (query instanceof Message) return query.guild ? query.guild : null;
		if (typeof query === 'string' && GUILD_REGEXP.test(query)) return this.client.guilds.get(GUILD_REGEXP.exec(query)[1]);
		return null;
	}

};
