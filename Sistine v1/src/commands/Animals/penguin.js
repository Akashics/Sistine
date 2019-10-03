const { Command } = require('klasa');
const { Penguins } = require('../../lib/util/Constants');

module.exports = class PenguCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['pingu', 'pengu'],
			botPerms: ['ATTACH_FILES'],
			description: msg => msg.language.get('COMMAND_PENGUIN_DESCRIPTION'),
			extendedHelp: msg => msg.language.get('COMMAND_PENGUIN_EXTENDED')
		});
	}

	async run(msg) {
		const file = Penguins[Math.floor(Math.random() * Penguins.length)];
		return msg.channel.sendFile(file);
	}

};
