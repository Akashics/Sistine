const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');
const invRegex = /discord(?:app\.com\/invite|\.gg)\/([\w-]{2,255})/gi;

module.exports = class antiInviteLinkMonitor extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false,
			ignoreEdits: false
		});
	}

	async run(msg) {
		if (!msg.guild || !msg.guild.available || !msg.guild.configs.moderation.invitelinks) return;

		const { configs } = msg.guild;
		if (await msg.hasAtLeastPermissionLevel(3)) return;
		const invite = invRegex.exec(msg.content);
		if (!invite) return;

		await msg.delete();
		if (!configs.channels.modlogs) return;
		const modLogChannel = msg.guild.channels.get(configs.channels.modlogs);
		if (!modLogChannel) return;
		const inv = await this.client.fetchInvite(invite[1]).catch(() => null);
		if (!inv) return;

		const embed = new MessageEmbed()
			.setAuthor(msg.guild.name, msg.guild.iconURL())
			.setColor('RED')
			.setFooter(this.client.user.tag, this.client.user.displayAvatarURL())
			.setTitle('Deleted Invite URL')
			.addField('Invite Code', inv.code, true)
			.addField('Guild', `${inv.guild.name} (${inv.guild.id})`, true)
			.addField('Members', inv.memberCount, true)
			.addField('Channel', inv.channel.name, true)
			.setDescription(`From ${msg.author.tag} in #${msg.channel.name}`);
		modLogChannel.send({ embeds: [{ embed }] });
	}

};
