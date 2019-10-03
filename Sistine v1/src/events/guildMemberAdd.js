const { Event } = require('klasa');

module.exports = class extends Event {

	async run(member) {
		if (!member || !member.guild.available) return;
		await this.welcomeMessage(member);
		await this.autorole(member);
	}

	async welcomeMessage(member) {
		if (!member.guild.configs.channels.welcome) return;
		const channel = member.guild.channels.get(member.guild.configs.channels.welcome);
		if (!channel) {
			await member.guild.configs.reset('channels.welcome', true);
			return member.guild.members.fetch(member.guild.ownerID)
				.send(`welcome messages have been disabled as the channel set was not found.`)
				.catch(err => this.client.emit('log', err, 'error'));
		}
		const msg = member.guild.configs.messages.welcome;
		if (!msg) return;
		return channel.send(this.replaceText(msg, member))
			.catch(err => this.client.emit('log'`Error trying to send welcome message to ${member.guild.name} (${member.guild.id})\n ${err}`, 'warn'));
	}

	async autorole(member) {
		if (!member.guild.configs.roles.autorole) return;
		const role = member.guild.roles.get(member.guild.configs.roles.autorole);
		if (!role) return member.guild.configs.reset('roles.autorole', true);
		const perms = member.guild.me.permissions;
		if (!perms.has('MANAGE_ROLES')) {
			return (await member.guild.members.fetch(member.guild.ownerID))
				.send(`Trident doesn't have manage roles permission, please join the support guild to learn how to enable this discord permission.`)
				.catch(err => this.client.emit('log', err, 'error'));
		}
		return member.roles.add(role);
	}

	/**
     * Parses and replaces variables for welcome message
     * {mention} Member mention
     * {server} Server name
     * {server.id} Server id
     * {username} Member's username
     * {user.tag} Member's tag (Username#discrim)
     * {user.id} Member's id,
     * {id} Member's id
     * {size} The guild's total memberCount
     * {count} The guild's total memberCount
     * @param {string} str Welcome message from guild configs
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
