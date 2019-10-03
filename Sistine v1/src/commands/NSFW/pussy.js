const { Command } = require('klasa');
const { Nsfw: { Pussy } } = require('../../lib/util/Constants');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			requiredPermissions: ['ATTACH_FILES'],
			description: 'NSFW Pussy Picture.',
			nsfw: true,
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const img = Pussy[Math.floor(Math.random() * Pussy.length)];
		return msg.channel.sendFile(img, `pussy.${img.slice(img.lastIndexOf('.'), img.length)}`);
	}

};
