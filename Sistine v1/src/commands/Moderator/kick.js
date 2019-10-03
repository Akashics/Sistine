const { Command } = require('klasa');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class KickCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 4,
			requiredPermissions: ['KICK_MEMBERS'],
			runIn: ['text'],
			description: 'Kicks the mentioned member.',
			usage: '<user:membername> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [member, ...reason]) {
		reason = reason.length > 0 ? reason.join(' ') : null;

		if (member.roles.highest.position >= msg.member.roles.highest.position) {
			return msg.send(`${msg.author.username}, that user out ranks you in permission levels, sorry.`);
		} else if (!member.kickable) {
			return msg.send(`${msg.author.username}, that user is not kickable.`);
		}

		member.send(`You've been kicked in ${msg.guild.name}${reason ? `, With reason of: ${reason}` : '.'}`).catch(() => {
			throw `User must have DMs turned off or blocked me :(`;
		});

		await member.kick(reason);

		if (msg.guild.configs.channels.modlogs) {
			new ModLog(msg.guild)
				.setType('kick')
				.setModerator(msg.author)
				.setUser(member.user)
				.setReason(reason)
				.send();
		}

		return msg.send(`Successfully kicked the member ${member.user.tag}${reason ? `\nWith reason of: ${reason}` : ''}`);
	}

};
