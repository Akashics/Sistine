const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Prune the queue list.'
		});

		this.requireMusic = true;
	}

	async run(msg) {
		const { music } = msg.guild;
		const size = music.queue.length;
		if (!msg.member.voiceChannel) return msg.sendMessage("You're currently not in a voice channel.");
		if (!music.playing) return msg.sendMessage("***There's currently no music playing!***");

		if (await msg.hasAtLeastPermissionLevel(3) || music.voiceChannel.members.size <= 3) {
			music.prune();
			return msg.sendMessage(`***Queue cleared. The size was ${size} songs.***`);
		} else {
			return msg.sendMessage('***There are members in the VoiceChat right now, use skip instead!***');
		}
	}

};
