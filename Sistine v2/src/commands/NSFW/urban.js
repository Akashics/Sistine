const { Command } = require('klasa');
const snekfetch = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const pageButtons = ['⬅', '➡', '🛑'];

module.exports = class Binary extends Command {

	constructor(...args) {
		super(...args, {
			nsfw: true,
			description: 'Define a word from the URBAN DICTIONARY.',
			usage: '<Text:str>'
		});
	}

	async run(msg, [string]) {
		if (!string.length) return msg.reply('You must provide some term to search in urban dictionary.');
		const { body } = await snekfetch.get('http://api.urbandictionary.com/v0/define')
			.query({ term: string });
		if (body.result_type === 'no_result') return msg.reply('No results were found for that term.');

		return this.paginate(msg, body.list, this.makeEmbed);
	}

	makeEmbed(list, page) {
		let description = list[page].definition;
		description += `\n\n**⮞ Example**:\n${list[page].example}`;

		return new MessageEmbed()
			.setColor(0x1e90ff)
			.setDescription(description)
			.setThumbnail('https://i.imgur.com/ressY86.png')
			.setTitle(`${list[page].word} - Page ${page + 1}/${list.length}`)
			.addField('👍', list[page].thumbs_up, true)
			.addField('👎', list[page].thumbs_down, true)
			.addBlankField(true)
			.setURL(list[page].permalink)
			.setFooter(`Author: ${list[page].author}`);
	}

	async paginate(message, list, makeEmbed) {
		const msg = await message.channel.send('`Loading please wait ...`');
		for (let i = 0; i < pageButtons.length; i++) await msg.react(pageButtons[i]);
		const embed = await msg.edit({ embed: this.makeEmbed(list, 0) });
		return this.progressPages(message, embed, list, 0, makeEmbed);
	}

	progressPages(message, embed, list, page, embedMakerFunction) {
		return embed.awaitReactions((rec, user) => user.id === message.author.id && pageButtons.includes(rec.emoji.toString()), { time: 30000, max: 1, errors: ['time'] })
			.then((reactions) => {
				const res = reactions.first();
				switch (res._emoji.name) {
					case '⬅':
						page -= 1;
						break;
					case '➡':
						page += 1;
						break;
					case '🛑':
						return embed.reactions.removeAll();
				}
				page = page <= 0 ? 0 : page >= list.length ? list.length - 1 : page;
				embed.edit(embedMakerFunction(list, page));
				res.users.remove(message.author);
				return this.progressPages(message, embed, list, page, embedMakerFunction);
			})
			.catch((error) => {
				this.client.console.error(error);
				return message.channel.send('There was some werid error. Sorry for the interuption.').then(sent => sent.delete({ timeout: 5000 }));
			});
	}

};

