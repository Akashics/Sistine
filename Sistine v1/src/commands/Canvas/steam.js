const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['steamcard', 'steamtradingcard'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Create a steam trading card.',
			usage: '[User:username]',
			extendedHelp: 'Uses the idiotic api to create a steam trading card.'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.steam(user.displayAvatarURL({ format: 'png', size: 512 }), user.username);
		return msg.channel.sendFile(image, 'steamtradecard.png');
	}

};
