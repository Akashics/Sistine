const { Argument, util: { regExpEsc } } = require('klasa');
const { GuildMember, User } = require('discord.js');

const USER_REGEXP = new RegExp('^(?:<@!?)?(\\d{17,21})>?$');

module.exports = class extends Argument {

	async run(arg, possible, msg) {
		if (!msg.guild) return this.client.arguments.get('member').run(arg, possible, msg);
		const resUser = await this.resolveMember(arg, msg.guild);
		if (resUser) return resUser;

		const results = [];
		const reg = new RegExp(regExpEsc(arg), 'i');
		for (const member of msg.guild.members.values()) {
			if (reg.test(member.user.username)) results.push(member);
			if (member.nickname && reg.test(member.nickname)) results.push(member);
		}

		let querySearch;
		if (results.length > 0) {
			const regWord = new RegExp(`\\b${regExpEsc(arg)}\\b`, 'i');
			const filtered = results.filter(member => regWord.test(member.user.username) || (member.nickname && regWord.test(member.nickname)));
			querySearch = filtered.length > 0 ? filtered : results;
		} else {
			querySearch = results;
		}

		switch (querySearch.length) {
			case 0: throw `${possible.name} Must be a valid name, id or user mention`;
			case 1: return querySearch[0];
			default: throw `Found multiple matches: \`${querySearch.map(user => user.displayName).join('`, `')}\``;
		}
	}

	resolveMember(query, guild) {
		if (query instanceof GuildMember) return query;
		if (query instanceof User) return guild.members.fetch(query);
		if (typeof query === 'string') {
			if (USER_REGEXP.test(query)) return guild.members.fetch(USER_REGEXP.exec(query)[1]).catch(() => null);
			if (/\w{1,32}#\d{4}/.test(query)) {
				const res = guild.members.find(member => member.user.tag.toLowerCase() === query.toLowerCase());
				return res || null;
			}
			return null;
		}
		return null;
	}

};
