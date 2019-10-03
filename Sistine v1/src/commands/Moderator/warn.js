const { Command } = require('klasa');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class WarnCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 4,
			runIn: ['text'],
			description: 'Warns the mentioned member.',
			usage: '<user:membername> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [member, ...reason]) {
		reason = reason.length > 0 ? reason.join(' ') : null;

		if (member.roles.highest.position >= msg.member.roles.highest.position) {
			return msg.send(`${msg.author.username}, you cannot simply warn this member.`);
		}

		if (msg.guild.configs.channels.modlogs) {
			new ModLog(msg.guild)
				.setType('warn')
				.setModerator(msg.author)
				.setUser(member.user)
				.setReason(reason)
				.send();
		}

		member.send(`You've been warned in ${msg.guild.name}${reason ? `, With reason of: ${reason}` : '.'}`).catch(() => {
			throw `User must have DMs turned off or blocked me :(`;
		});
		return msg.send(`Successfully warned the member ${member.user.tag}${reason ? `\nWith reason of: ${reason}` : ''}`);
	}

};
