const { Command } = require('klasa');

module.exports = class FacepalmCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 35,
			aliases: ['facep'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Some people might really get you the point to Facepalm, this does exactly that..',
			extendedHelp: 'You know when people are just really annoying or stupid? Just use this command to facepalm super hard.'
		});
	}

	async run(msg) {
		const image = await this.client.idioticApi.facepalm(msg.author.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'facepalm.png');
	}


};
