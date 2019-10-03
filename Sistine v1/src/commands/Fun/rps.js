const { Command } = require('klasa');

module.exports = class RockPaperScissorsCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 15,
			description: 'Play rock-paper-scissors with the bot.',
			usage: '<rock|paper|scissors>'
		});
	}

	async run(msg, [move]) {
		let botChoice = Math.random();
		if (botChoice < 0.34) botChoice = 'rock';
		else if (botChoice <= 0.67) botChoice = 'paper';
		else botChoice = 'scissors';

		if (move === botChoice) {
			return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. It's a tie!`);
		}
		if (move.match(/rock/i)) {
			if (botChoice === 'scissors') {
				return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. Rock wins!`);
			} else {
				return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. Paper wins!`);
			}
		}
		if (move.match(/paper/i)) {
			if (botChoice === 'rock') {
				return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. Paper wins!`);
			} else {
				return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. Scissors win!`);
			}
		}
		if (move.match(/scissors/i)) {
			if (botChoice === 'rock') {
				return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. Rock wins!`);
			} else {
				return msg.send(`You choose **${move}**,\n\nI choose **${botChoice}**. Scissors win!`);
			}
		}
	}

};
