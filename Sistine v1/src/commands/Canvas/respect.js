const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Pay respects to someone.',
			usage: '[User:username]',
			extendedHelp: 'You can pay respects to any user on Discord.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.respect(user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.sendFile(image, 'respect.png');
	}

};
