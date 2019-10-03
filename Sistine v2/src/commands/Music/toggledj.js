const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: false,
			requireMusic: false,
			permissionLevel: 5,
			cooldown: 8,
			aliases: ['djonly', 'enabledjonly', 'disabledjonly'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_DJONLY_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		if (!msg.hasAtLeastPermissionLevel(3)) return msg.reply(`｢ **Error** ｣ You need to be a **DJ** to change the volume.`);
		if (msg.guild.settings.djOnly) {
			await msg.guild.settings.update('djOnly', false);
			return msg.sendMessage(`DJ-only Mode has been disabled.`);
		} else {
			await msg.guild.settings.update('djOnly', true);
			return msg.sendMessage(`DJ-only Mode has been enabled.`);
		}
	}

};
