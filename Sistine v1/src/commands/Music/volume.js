const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permissionLevel: 2,
			description: 'Change the volume',
			extendedHelp: 'No extended help available.',
			usage: '[Volume:integer{25,150}]'
		});

		this.requireMusic = true;
	}

	async run(msg, [volume]) {
		const { music } = msg.guild;
		if (!volume) return msg.sendMessage(`The current volume is set to \`${music.volume}\``);
		music.player.volume(volume);
		return msg.sendMessage(`Sucessfully set the volume to \`${volume}\``);
	}

};
