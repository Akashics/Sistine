const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['forceleave', 'leave', 'stopmusic', 'musicstop', 'stop'],
			runIn: ['text'],
			description: 'Clears the queue and leaves'
		});

		this.requireMusic = true;
	}

	async run(msg) {
		const { music } = msg.guild;

		if (music.voiceChannel.members.size > 4) {
			if (!await msg.hasAtLeastPermissionLevel(2)) throw "You can't execute this command when there are over 4 members. You must be at least a Dj Member.";
		}

		// Destroy interface
		await music.destroy();
		return msg.send(`Successfully left the voice channel ${msg.guild.me.voiceChannel}`);
	}

};
