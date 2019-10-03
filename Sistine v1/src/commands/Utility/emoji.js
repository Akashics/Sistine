const { Command } = require('klasa');
const { Util: { parseEmoji } } = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_LINKS'],
			description: 'Supersize that emoji.',
			extendedHelp: 'No extended help available.',
			usage: '<Emoji:string>'
		});
	}

	async run(msg, [emoji]) {
		const parsedEmoji = this.emoji(emoji);
		const isValid = await this.validEmoji(parsedEmoji);
		if (!isValid) return msg.sendMessage(`\`${emoji}\` is not a valid emoji.`);
		return msg.channel.sendFile(parsedEmoji.url, parsedEmoji.url, 'Here is your emoji that you requested');
	}

	emoji(arg) {
		const discordEmoji = parseEmoji(arg);
		if (discordEmoji.id) {
			return {
				type: 'custom',
				url: `https://cdn.discordapp.com/emojis/${discordEmoji.id}.${discordEmoji.animated ? 'gif' : 'png'}`,
				name: `${discordEmoji.name}.${discordEmoji.animated ? 'gif' : 'png'}`,
				animated: discordEmoji.animated
			};
		}
		let result = [], count = 0, page = 0, int = 0;
		while (int < arg.length) {
			count = arg.charCodeAt(int++);
			if (page) {
				result.push((0x10000 + ((page - 0xD800) << 10) + (count - 0xDC00)).toString(16)); // eslint-disable-line no-bitwise
				page = 0;
			} else if (count >= 0xD800 && count <= 0xDBFF) {
				page = count;
			} else {
				result.push(count.toString(16));
			}
		}
		result = result.join('-');
		return {
			type: 'unicode',
			url: `https://twemoji.maxcdn.com/2/72x72/${result}.png`,
			name: `${result}.png`,
			animated: false
		};
	}

	validEmoji(emoji) {
		return snekfetch.get(emoji.url).then(() => true).catch(() => false);
	}

};
