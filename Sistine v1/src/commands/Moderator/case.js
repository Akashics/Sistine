const { Command } = require('klasa');

module.exports = class CaseCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 4,
			runIn: ['text'],
			description: 'Check a case.',
			usage: '<case:integer>'
		});

		this.provider = null;
	}

	async run(msg, [selected]) {
		const modlogs = await this.provider.get('modlogs', msg.guild.id).then(data => data || { logs: [] });
		const log = modlogs.logs[selected];
		if (!log) return msg.send(`${msg.author.username}, that modlog does not exist, yet.`);
		return msg.send([
			`User      : ${log.user.tag} (${log.user.id})`,
			`Moderator : ${log.moderator.tag} (${log.moderator.id})`,
			`Reason    : ${log.reason || `No reason specified, write '${msg.guild.settings.prefix}reason ${selected}' to claim this log.`}`
		], { code: 'http' });
	}

	init() {
		this.provider = this.client.providers.get('mongodb');
	}

};
