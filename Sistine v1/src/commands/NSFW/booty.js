const { Command } = require('klasa');
const { Nsfw: { Booty } } = require('../../lib/util/Constants');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 10,
			aliases: ['ass', 'butt', 'butts'],
			requiredPermissions: ['ATTACH_FILES'],
			nsfw: true,
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const img = Booty[Math.floor(Math.random() * Booty.length)];
		return msg.channel.sendFile(img, `ass-booty.${img.slice(img.lastIndexOf('.'), img.length)}`);
	}

};
