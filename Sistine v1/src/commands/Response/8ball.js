const { Command } = require('klasa');
const { MagicballAnswers } = require('../../lib/util/Constants');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['magic8'],
			description: 'Same thing as the magic 8ball toy.',
			usage: '<Question:str>'
		});
	}

	async run(msg, [question]) {
		if (!question.endsWith('?')) return msg.sendMessage("🎱 That doesn't look like a question, try again please. (put a question make at the end)");
		return msg.send(`🎱 *${question}?*\n${MagicballAnswers[Math.floor(Math.random() * MagicballAnswers.length)]}`);
	}

};
