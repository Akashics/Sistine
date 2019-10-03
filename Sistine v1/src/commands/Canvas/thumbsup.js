const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			aliases: ['vault', 'vaultboy'],
			description: 'Give a thumbs up as another user.',
			usage: '[User:username]',
			extendedHelp: 'Mention another user to thumbs up of them.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.vaultBoy(user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.sendFile(image, 'vaultboy.png');
	}

};
