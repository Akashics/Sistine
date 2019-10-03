const { Command } = require('klasa');

module.exports = class LockdownCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 4,
			requiredPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
			runIn: ['text'],
			description: 'Lock/unlock the selected channel.',
			usage: '[channel:channelname]'
		});
	}

	async run(msg, [channel = msg.channel]) {
		const channelType = channel.type === 'text' ? 'SEND_MESSAGES' : channel.type === 'category' ? 'SEND_MESSAGES' : 'CONNECT';
		const locked = await this.handleLockdown(channel, channelType);

		if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') === false) return true;
		return msg.send(`I have successfully ${locked ? '' : 'un'}locked the channel ${channel}`);
	}

	handleLockdown(channel, permission) {
		const permOverwrite = channel.permissionOverwrites.get(channel.guild.defaultRole.id);
		const locked = permOverwrite ? permOverwrite.denied.has(permission) : false;
		return channel.overwritePermissions(channel.guild.defaultRole, { [permission]: locked }, locked ? 'Lockdown released.' : 'Lockdown to prevent spam.')
			.then(() => !locked);
	}

};
