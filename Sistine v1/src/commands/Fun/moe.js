const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const snek = require('snekfetch');

module.exports = class MoeImage extends Command {

	/* eslint-disable max-len */
	constructor(...args) {
		super(...args, {
			description: (msg) => msg.language.get('COMMAND_MOE_DESCRIPTION'),
			aliases: ['weebsh'],
			usage: '[ImageType:string]'
		});
		this.types = ['awoo', 'bang', 'blush', 'clagwimoth', 'cry', 'dance', 'insult', 'jojo', 'lewd', 'lick', 'megumin', 'neko', 'nom', 'owo', 'pout', 'punch', 'rem', 'shrug', 'sleepy', 'smile', 'teehee', 'smug', 'stare', 'thumbsup', 'triggered', 'wag', 'waifu_insult', 'wasted', 'greet'];
	}

	async run(msg, [type]) {
		const Embed = new MessageEmbed();
		if (!type || !this.types.includes(type)) {
			Embed
				.setColor('PURPLE')
				.setFooter('Sistine Fibel', this.client.user.displayAvatarURL())
				.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
				.setDescription(`\`${this.types.join('`, `')}\``)
				.setTitle('Types of Moe Images - moe <type>');
			return msg.sendEmbed(Embed);
		}
		const { body } = await snek.get(`https://api.weeb.sh/images/random?type=${type}`)
			.set('Authorization', `Wolke ${this.client.settings.apiTokens.weebservices}`)
			.catch(error => this.client.emit('error', `WEEBIMAGE: ${error}`));
		Embed
			.setColor('PURPLE')
			.setImage(body.url);
		return msg.sendEmbed(Embed);
	}

};
