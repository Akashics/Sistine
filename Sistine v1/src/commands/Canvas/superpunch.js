const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Punch someone as Superman.',
			usage: '[Punched:username]'
		});
	}

	async run(msg, [punched = msg.author]) {
		const image = await this.client.idioticApi.superPunch(msg.author.displayAvatarURL({ format: 'png', size: 128 }), punched.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'superman-super-punch.png');
	}

};
