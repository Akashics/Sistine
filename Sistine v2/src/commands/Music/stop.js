const MusicCommand = require('../../library/Music/MusicCommand');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireDJ: true,
			requireMusic: false,
			cooldown: 8,
			aliases: ['forceleave', 'leave', 'stopmusic', 'musicstop', 'stop'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_LEAVE_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.queue || !music.queue.length) return msg.sendMessage(`***There are No Songs in the Queue at the momemnt.***`);

		const vc = music.voiceChannel ? music.voiceChannel.members.size <= 4 : true;
		if (await msg.hasAtLeastPermissionLevel(3) || vc) {
			await music.destroy();
			return msg.sendMessage(`Queue cleared, leaving voice channel.`);
		} else {
			return msg.sendMessage(`｢ **Error** ｣ There are too many people here, you can only use the skip command.`);
		}
	}

};
