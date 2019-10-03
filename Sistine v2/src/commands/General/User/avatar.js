const { Command } = require('klasa');

module.exports = class Avatar extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['avtr'],
			description: (lang) => lang.get('COMMAND_AVATAR_DESCRIPTION'),
			usage: '[User:user]'
		});
	}

	async run(msg, [mentioned = msg.author]) {
		if (!mentioned.avatar) { return msg.send(msg.language.get('COMMAND_AVATAR_ERROR', mentioned.tag)); }
		const avatar = mentioned.displayAvatarURL({
			format: mentioned.avatar.startsWith('a_') ? 'gif' : 'png',
			size: 2048
		});
		return msg.send(avatar);
	}

};
