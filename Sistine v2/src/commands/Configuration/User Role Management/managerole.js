const { Command } = require('klasa');
const perms = ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_MESSAGES', 'MANAGE_EMOJIS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'VIEW_AUDIT_LOG'];
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'MANAGE_ROLES'],
			aliases: ['addselfrole', 'addselfroles', 'removeselfrole', 'removeselfroles', 'manageroles'],
			cooldown: 5,
			permissionLevel: 6,
			description: language => language.get('COMMAND_SELFROLES_MANAGE'),
			extendedHelp: 'No extended help available.',
			usage: '<role:rolename>'
		});
	}

	async run(msg, [role]) {
		const { roles } = msg.guild.settings.selfroles;
		if (!roles) return msg.send(msg.language.get('MANAGEROLE_NOSELFROLES'));

		const myRole = msg.guild.me.roles.highest;
		if (role.position > myRole.position) return msg.send(msg.language.get('MANAGEROLE_OVERRANKED'));

		const permissions = perms.some(permission => role.permissions.has(permission));

		if (permissions) return msg.send(msg.language.get('MANAGEROLE_MODPERMS'));

		const includ = !roles.includes(role.id);
		await msg.guild.settings.update('selfroles.roles', role, msg.guild);
		return msg.send(msg.language.get('MANAGEROLE_SUCCESS', role.name, includ));
	}

};
