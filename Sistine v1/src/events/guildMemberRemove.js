const { Event } = require('klasa');

module.exports = class extends Event {

	async run(member) {
		if (!member || !member.guild.available) return;
		await this.leaveMessage(member);
	}

	async leaveMessage(member) {
		if (!member.guild.configs.channels.goodbye) return;
		const channel = member.guild.channels.get(member.guild.configs.channels.goodbye);
		if (!channel) {
			await member.guild.configs.reset('channels.goodbye', true);
			(await member.guild.members.fetch(member.guild.ownerID))
				.send(`goodbye messages have been disabled as the channel set was not found.`)
				.catch(err => this.client.emit('log', err, 'error'));
			return;
		}
		const msg = member.guild.configs.messages.goodbye;
		if (!msg) return;
		const message = this.replaceText(msg, member);
		return channel.send(message)
			.catch(err => this.client.emit('log'`Error trying to send goodbye message to ${member.guild.name} (${member.guild.id})\n ${err}`, 'warn'));
	}

	/**
     * Parses and replaces variables for goodbye message
     * {mention} Member mention
     * {server} Server name
     * {server.id} Server id
     * {username} Member's username
     * {user.tag} Member's tag (Username#discrim)
     * {user.id} Member's id,
     * {id} Member's id
     * {size} The guild's total memberCount
     * {count} The guild's total memberCount
     * @param {string} str Goodbye message from guild configs
     * @param {GuildMember} member The member
     * @returns {string}
     */
	replaceText(str, member) {
		return str.replace(/\{(mention|server|server\.id|username|user\.tag|user\.id|id|size|count)\}/gi, (__, match) => {
			switch (match.toLowerCase()) {
				case 'mention': return member.toString();
				case 'server': return member.guild.name;
				case 'server.id': return member.guild.id;
				case 'username': return member.user.username;
				case 'user.tag': return member.user.tag;
				case 'user.id':
				case 'id': return member.id;
				case 'size':
				case 'count': return member.guild.memberCount;
				default: return __;
			}
		});
	}

};
