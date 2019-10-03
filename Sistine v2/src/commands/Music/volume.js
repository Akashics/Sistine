const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: true,
			cooldown: 8,
			aliases: ['changevol', 'setvolume'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_VOLUME_DESCRIPTION'),
			extendedHelp: 'No extended help available.',
			usage: '[volume:integer]'
		});
	}

	async run(msg, [volume]) {
		if (!volume) return msg.sendMessage(`**Senko-san** is currently playing at ${msg.guild.settings.musicVolume}%`);
		if (!await msg.hasAtLeastPermissionLevel(3)) return msg.reply(`｢ **Error** ｣ You need to be a **DJ** to change the volume.`);
		if (volume < 0 || volume > 100) return msg.sendMessage(`｢ **Error** ｣ Volume can only range from 0 to 100.`);
		await msg.guild.settings.update('musicVolume', volume);
		if (msg.guild.music.playing) msg.guild.music.player.volume(volume);
		return msg.sendMessage(`Volume has been set to: ${volume}`);
	}

};
