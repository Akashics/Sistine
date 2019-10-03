const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Resumes the current song.'
		});

		this.requireMusic = true;
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.playing) throw 'Music is not playing.';
		if (!music.paused) throw 'The music is not paused.';

		music.resume();
		return msg.send('Sucessfully resumed music.');
	}

};
