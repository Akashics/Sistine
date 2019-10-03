const Command = require('../../../library/Util/KlasaCommand');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['toggleautorole', 'enableautoroles', 'disableautoroles'],
			permissionLevel: 6,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_TOGGLE_ROLES_DESCRPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		if (msg.guild.settings.get('autoroles.enabled') === false) {
			return msg.guild.settings.update('autoroles.enabled', true).then(() => {
				msg.sendMessage(`All good here! ${msg.language.get('MESSAGE_AUTOROLES_ENABLED')}`);
			});
		} else {
			return msg.guild.settings.update('autoroles.enabled', false).then(() => {
				msg.sendMessage(`All good here! ${msg.language.get('MESSAGE_AUTOROLES_DISABLED')}`);
			});
		}
	}

};
