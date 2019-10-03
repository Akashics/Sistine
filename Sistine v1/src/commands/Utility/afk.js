const { Command } = require('klasa');

module.exports = class AfkCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 60,
			aliases: ['setafk'],
			description: 'Tell the world that your not at your computer.',
			usage: '[Message:string]'
		});
	}

	async run(msg, [message = 'none']) {
		const has = await this.client.afks.has(msg.author.id);
		if (has) {
			await this.client.afks.delete(msg.author.id);
			return msg.send(`${msg.author.username}, you have been removed from your afk state.`);
		}
		await this.client.afks.set(msg.author.id, message);
		return msg.send(`${msg.author.username}, you are now afk for the following reason:\`\`\`fix\n${message}\`\`\``);
	}

};
