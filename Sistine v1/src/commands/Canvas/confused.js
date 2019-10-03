const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Show someone how confused you are.',
			usage: '<User:username>'
		});
	}

	async run(msg, [user]) {
		const image = await this.client.idioticApi.confused(msg.author.displayAvatarURL({ format: 'png', size: 128 }), user.displayAvatarURL({ format: 'png', size: 128 }));
		return msg.channel.sendFile(image, 'confused.png');
	}

};
