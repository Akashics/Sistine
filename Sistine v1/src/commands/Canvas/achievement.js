const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Creates an image based achievement',
			usage: '[User:username] <Text:string{1,22}>',
			extendedHelp: 'Either mention a user with text to give the achievement their user avatar, or just supply text for your own achievement.'
		});
	}

	async run(msg, [user = msg.author, text]) {
		const image = await this.client.idioticApi.achievement(user.displayAvatarURL({ format: 'png', size: 32 }), text);
		return msg.channel.sendFile(image, 'achievement.png');
	}

};
