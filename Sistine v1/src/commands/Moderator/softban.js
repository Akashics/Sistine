const { Command } = require('klasa');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class SoftbanCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 4,
			requiredPermissions: ['BAN_MEMBERS'],
			runIn: ['text'],
			description: 'Softbans the mentioned member.',
			usage: '<user:user> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [user, ...reason]) {
		reason = reason.length > 0 ? reason.join(' ') : null;
		const force = 'force' in msg.flags ? 'force' in msg.flags && !msg.guild.members.has(msg.flags.force) : false;
		const member = await msg.guild.members.fetch(user).catch(() => null);
		if (!member && !force) return;

		if (!force && member.roles.highest.position >= msg.member.roles.highest.position) {
			return msg.send(`${msg.author.username}, that user out ranks you in permission levels, sorry.`);
		} else if (!force && member.bannable === false) {
			return msg.send(`${msg.author.username}, that user is not bannable.`);
		}

		await msg.guild.members.ban(user, { reason, days: 1 }).catch(() => {
			if (!force) return;
			throw `Unable to force softban ${user}`;
		});
		if (member && !force) {
			member.send(`You've been softbanned in ${msg.guild.name}${reason ? `, With reason of: ${reason}` : '.'}`).catch(() => {
				throw `User must have DMs turned off or blocked me :(`;
			});
		}

		await msg.guild.members.unban(user, 'Softban process. Pruned one day worth of messages.').catch(() => {
			if (!force) return;
			throw `Unable to unban user from softban. ${user}`;
		});

		if (msg.guild.configs.channels.modlogs) {
			new ModLog(msg.guild)
				.setType('softban')
				.setModerator(msg.author)
				.setUser(user)
				.setReason(reason)
				.send();
		}

		return msg.send(`Successfully softbanned the member ${user.tag}${reason ? `\nWith reason of: ${reason}` : ''}`);
	}

};
