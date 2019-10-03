const { Command } = require('klasa');
const { Nsfw: { Boobs } } = require('../../lib/util/Constants');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['boobies', 'tits', 'boob', 'titties'],
			requiredPermissions: ['ATTACH_FILES'],
			nsfw: true,
			description: 'Gets a NSFW boob image.',
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const img = Boobs[Math.floor(Math.random() * Boobs.length)];
		return msg.channel.sendFile(img, `boobies.${img.slice(img.lastIndexOf('.'), img.length)}`);
	}

};

