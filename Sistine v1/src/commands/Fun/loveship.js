const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
const snek = require('snekfetch');

module.exports = class LoveShip extends Command {

	/* eslint-disable max-len */
	constructor(...args) {
		super(...args, {
			description: 'Used for generating love ships.',
			aliases: ['ship'],
			usage: '<User:user> <User2:User>',
			usageDelim: ' '
		});
	}

	async run(msg, [user, user2]) {
		const mssg = await msg.send('<a:loading:402288838187417601> Waiting for resources to load.');
		const targetOne = user.displayAvatarURL({ size: 2048, format: 'png' });
		const targetTwo = user2.displayAvatarURL({ size: 2048, format: 'png' });

		const { body } = await snek.post(`https://api.weeb.sh/auto-image/love-ship`)
			.set('Authorization', `Wolke ${this.client.settings.apiTokens.weebservices}`)
			.set('User-Agent', 'Sistine/5.0.0-dev')
			.send({ targetOne, targetTwo })
			.catch(error => this.client.emit('error', `WEEBIMAGE: ${error}`));

		mssg.delete();
		return msg.channel.send({
			embed: {
				files: [new MessageAttachment(body, `lovethang.png`)],
				color: 3553598,
				image: { url: `attachment://lovethang.png` },
				title: `**${msg.author.tag}** shipped _${user.tag}_ and _${user2.tag}_!`
			}
		});
	}

};
