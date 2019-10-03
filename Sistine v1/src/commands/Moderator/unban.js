const { Command } = require('klasa');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class UnbanCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['BAN_MEMBERS'],
			runIn: ['text'],
			description: 'Unbans the mentioned user.',
			usage: '<user:user> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [user, ...reason]) {
		reason = reason.length > 0 ? reason.join(' ') : null;

		const bans = await msg.guild.fetchBans();

		if (bans.has(user.id) === false) return msg.send(`${msg.author.username}, this user is not banned.`);


		await msg.guild.members.unban(user, reason);

		if (msg.guild.configs.channels.modlogs) {
			new ModLog(msg.guild)
				.setType('unban')
				.setModerator(msg.author)
				.setUser(user)
				.setReason(reason)
				.send();
		}

		return msg.send(`Successfully unbanned the member ${user.tag}${reason ? `\nWith reason of: ${reason}` : ''}`);
	}

};
