const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['toggleselfrole', 'enableselfroles', 'disableselfroles'],
			permissionLevel: 6,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_TOGGLE_SELFROLES'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const current = msg.guild.settings.get('selfroles.enabled');
		msg.guild.settings.update('selfroles.enabled', !current);
		return msg.send(msg.language.get('SELFROLES_STATUS', !current));
	}

};
