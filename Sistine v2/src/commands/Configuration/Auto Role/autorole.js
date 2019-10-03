const Command = require('../../../library/Util/KlasaCommand');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['addautorole', 'removeautorole', 'removeautoroles', 'deleteautorole', 'deleteautoroles'],
			permissionLevel: 6,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			usage: '<role:rolename>',
			description: language => language.get('COMMAND_ADD_ROLES_DESCRPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg, [role]) {
		msg.send(msg.language.get('AUTOROLE_ENABLED', role.name, !msg.guild.settings.get('autoroles.roles').indexOf(role.id) !== -1));
		return msg.guild.settings.update('autoroles.roles', role, msg.guild);
	}

};
