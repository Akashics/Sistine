const { Command, util } = require('klasa');
const { MessageEmbed } = require('discord.js');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class ReasonCommand extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 4,
			runIn: ['text'],
			requiredConfigs: ['channels.modlogs'],
			description: 'Edit the reason field from a case.',
			usage: '<case:integer> <reason:string> [...]',
			usageDelim: ' '
		});

		this.provider = null;
	}

	async run(msg, [selected, ...reason]) {
		reason = reason.length > 0 ? reason.join(' ') : null;

		const modlogs = await this.provider.get('modlogs', msg.guild.id);
		const log = modlogs.logs[selected];
		if (!log) return msg.send(`${msg.author.username}, that modlog case does not exist, yet.`);

		const channel = msg.guild.channels.get(msg.guild.configs.channels.modlogs);
		if (!channel) return msg.send("The modlog channel does not exist, ir I don't have access to see it?");

		const messages = await channel.messages.fetch({ limit: 100 });
		const message = messages.find(mes => mes.author.id === this.client.user.id &&
            mes.embeds.length > 0 &&
            mes.embeds[0].type === 'rich' &&
            mes.embeds[0].footer && mes.embeds[0].footer.text === `Case ${selected}`
		);

		if (message) {
			const embed = message.embeds[0];
			const [type, user] = embed.description.split('\n');
			embed.description = [
				type,
				user,
				`**Reason**: ${reason}`
			].join('\n');
			await message.edit({ embed });
		} else {
			const embed = new MessageEmbed()
				.setAuthor(log.moderator.tag)
				.setColor(ModLog.colour(log.type))
				.setDescription(`
**Type**: ${log.type}
**User**: ${log.user.tag} (${log.user.id})
**Reason**: ${reason}
`)
				.setFooter(`Case ${selected}`)
				.setTimestamp();
			await channel.send({ embed });
		}

		const oldReason = log.reason;

		modlogs.logs[selected].reason = reason;
		await this.provider.replace('modlogs', msg.guild.id, modlogs);

		return msg.send(`Successfully updated the log ${selected}.${util.codeBlock('http', [
			`Old reason : ${oldReason || 'Not set.'}`,
			`New reason : ${reason}`
		].join('\n'))}`);
	}

	init() {
		this.provider = this.client.providers.get('mongodb');
	}

};
