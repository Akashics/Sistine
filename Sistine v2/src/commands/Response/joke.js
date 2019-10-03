const { Command } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class Joke extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['dad'],
			description: (lang) => lang.get('COMMAND_JOKE_DESCRIPTION')
		});
		this.emoji = [
			'( ಠ ʖ̯ ಠ)',
			'( ఠ ͟ʖ ఠ)',
			'(っ˘ڡ˘ς)',
			'(∩｀-´)⊃━☆ﾟ.*･｡ﾟ',
			'(⊃｡•́‿•̀｡)⊃',
			'(._.)',
			'♨_♨',
			'[¬º-°]¬',
			'(Ծ‸ Ծ)',
			'ヾ(-_- )ゞ',
			'(づ￣ ³￣)づ',
			'ﾟДﾟ',
			'（ ^_^）',
			'ฅ^•ﻌ•^ฅ',
			'ಠ_ಠ'
		];
	}

	async run(msg) {
		try {
			const { body } = await snekfetch
				.get('https://icanhazdadjoke.com/')
				.set({ Accept: 'application/json' });
			return msg.send(`📢 **Random Joke**  ${this.emoji[Math.floor(Math.random() * this.emoji.length)]} _${body.joke}_`);
		} catch (err) {
			return msg.send(msg.language.get('COMMAND_ERROR'));
		}
	}

};
