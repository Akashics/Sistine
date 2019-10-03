const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Pauses the current song.'
		});

		this.requireMusic = true;
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.playing) throw 'Music is not playing.';
		if (music.paused) throw 'The stream is already paused.';

		music.pause();
		return msg.send('Sucessfully paused music.');
	}

};
