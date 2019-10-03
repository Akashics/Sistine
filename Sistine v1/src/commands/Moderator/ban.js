const { Command } = require('klasa');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class BanCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['BAN_MEMBERS'],
			runIn: ['text'],
			description: 'Bans the mentioned member.',
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
		}
		if (!force && member.bannable === false) {
			return msg.send(`${msg.author.username}, that user is not bannable.`);
		}

		if (member && !force) {
			return member.send(`You've been banned in ${msg.guild.name}${reason ? `, With reason of: ${reason}` : '.'}`).catch(() => {
				throw `User must have DMs turned off or blocked me :(`;
			});
		}

		await msg.guild.members.ban(user, { reason }).catch(() => {
			if (!force) return;
			throw `Unable to force ban ${user}`;
		});

		if (msg.guild.configs.channels.modlogs) {
			new ModLog(msg.guild)
				.setType('ban')
				.setModerator(msg.author)
				.setReason(reason)
				.setUser(user)
				.send();
		}

		return msg.send(`Successfully banned the member ${user.tag}${reason ? `\nWith reason of: ${reason}` : ''}`);
	}

};
