const { Command } = require('klasa');
const snekfetch = require('snekfetch');
const { MessageEmbed } = require('discord.js');

module.exports = class BotOrg extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Searches DiscordBots.org for information on a bot.',
			usage: '[DiscordBot:user]'
		});
	}

	async run(msg, [bot = this.client.user]) {
		try {
			const { body } = await snekfetch.get(`https://discordbots.org/api/bots/${bot.id}`);
			const build = new MessageEmbed()
				.setColor('PURPLE')
				.setAuthor('discordbots.org', 'https://discordbots.org/')
				.setTitle(body.certifiedBot ? `<:certifiedbot:373310120886796289> ${body.username}#${body.discriminator}` : `${body.username}#${body.discriminator}`)
				.setURL(`https://discordbots.org/bot/${bot.id}`)
				.setThumbnail(`https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.png?size=256`)
				.setDescription(body.shortdesc)
				.addField('➔ Prefix', body.prefix, true)
				.addField('➔ Library', body.lib, true)
				.addField('➔ Certified', body.certifiedBot ? 'Yes' : 'No :/', true)
				.addField('➔ Server Count', body.server_count ? body.server_count : 'No API Info', true)
				.addField('➔ Invite', `[Invited Link](${body.invite})`, true)
				.addField('➔ Website', `[Webby Site](${body.website})` || 'No Website', true)
				.addField('➔ Upvotes', body.points, true)
				.addField('➔ Owner', this.client.users.filter(user => body.owners.includes(user.id)).map(user => user.tag), true);
			return msg.sendEmbed(build);
		} catch (err) {
			if (err.status === 404) return msg.send(msg.language.get('COMMAND_BOTLIST_ERROR', bot.tag));
			return msg.send(msg.language.get('COMMAND_BOTLIST_FATAL'));
		}
	}

};
